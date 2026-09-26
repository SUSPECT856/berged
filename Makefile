SHELL := /bin/bash
BUILD := build
CC := gcc
AS := as
LD := ld
OBJCOPY := objcopy
CFLAGS := -m64 -ffreestanding -fno-pic -fno-pie -fno-stack-protector -mno-red-zone -mno-sse -mno-sse2 -mno-mmx -nostdlib -Wall -Wextra -Werror -O2
LDFLAGS := -nostdlib -T linker.ld -z max-page-size=0x1000 -z separate-code

.PHONY: all clean check image run boot-test debug
all: image

$(BUILD):
	mkdir -p $(BUILD)

$(BUILD)/kernel.o: kernel/kernel.c | $(BUILD)
	$(CC) $(CFLAGS) -c $< -o $@

$(BUILD)/entry.o: kernel/entry.S | $(BUILD)
	$(AS) --64 $< -o $@

$(BUILD)/kernel.elf: $(BUILD)/entry.o $(BUILD)/kernel.o linker.ld | $(BUILD)
	$(LD) $(LDFLAGS) -o $@ $(BUILD)/entry.o $(BUILD)/kernel.o

$(BUILD)/kernel.bin: $(BUILD)/kernel.elf
	$(OBJCOPY) -O binary $< $@

$(BUILD)/kernel.sectors: $(BUILD)/kernel.bin
	bytes=$$(stat -c%s $<); sectors=$$(( (bytes + 511) / 512 )); echo $$sectors > $@; echo "kernel bytes=$$bytes sectors=$$sectors"

$(BUILD)/kernel.padded.bin: $(BUILD)/kernel.bin $(BUILD)/kernel.sectors
	cp $(BUILD)/kernel.bin $@
	sectors=$$(cat $(BUILD)/kernel.sectors); truncate -s $$((sectors * 512)) $@

$(BUILD)/stage2.bin: boot/stage2.S $(BUILD)/kernel.sectors
	set -e; sectors=$$(cat $(BUILD)/kernel.sectors); 	$(AS) --32 --defsym KERNEL_BYTES=$$((sectors * 512)) --defsym KERNEL_SECTORS=$$sectors --defsym KERNEL_LBA=1 boot/stage2.S -o $(BUILD)/stage2.tmp.o; 	$(LD) -m elf_i386 --oformat binary -Ttext 0x8000 -e _start -o $(BUILD)/stage2.tmp.bin $(BUILD)/stage2.tmp.o; 	bytes=$$(stat -c%s $(BUILD)/stage2.tmp.bin); stage2_sectors=$$(( (bytes + 511) / 512 )); kernel_lba=$$((1 + stage2_sectors)); 	$(AS) --32 --defsym KERNEL_BYTES=$$((sectors * 512)) --defsym KERNEL_SECTORS=$$sectors --defsym KERNEL_LBA=$$kernel_lba boot/stage2.S -o $(BUILD)/stage2.o; 	$(LD) -m elf_i386 --oformat binary -Ttext 0x8000 -e _start -o $(BUILD)/stage2.bin $(BUILD)/stage2.o; 	final_bytes=$$(stat -c%s $(BUILD)/stage2.bin); final_sectors=$$(( (final_bytes + 511) / 512 )); echo $$final_sectors > $(BUILD)/stage2.sectors; truncate -s $$((final_sectors * 512)) $(BUILD)/stage2.bin; rm -f $(BUILD)/stage2.tmp.o $(BUILD)/stage2.tmp.bin

$(BUILD)/stage1.o: boot/stage1.S $(BUILD)/stage2.bin
	sectors=$$(cat $(BUILD)/stage2.sectors); $(AS) --32 --defsym STAGE2_SECTORS=$$sectors $< -o $@

$(BUILD)/stage1.bin: $(BUILD)/stage1.o
	$(LD) -m elf_i386 --oformat binary -Ttext 0x7c00 -e _start -o $@ $<
	@test "$$(stat -c%s $@)" -eq 512
	@test "$$(od -An -tx2 -j510 -N2 $@ | tr -d ' ')" = "aa55"

image: $(BUILD)/stage1.bin $(BUILD)/stage2.bin $(BUILD)/kernel.padded.bin
	cat $(BUILD)/stage1.bin $(BUILD)/stage2.bin $(BUILD)/kernel.padded.bin > $(BUILD)/berged-os-0.0.1.img

check: image
	@set -e; test "$$(readelf -h $(BUILD)/kernel.elf | awk '/Entry point address/ {print $$4}')" = "0x100000"; 	echo "[PASS] boot signature"; echo "[PASS] kernel entry 0x100000"; 	echo "[INFO] stage2 sectors=$$(cat $(BUILD)/stage2.sectors)"; echo "[INFO] kernel sectors=$$(cat $(BUILD)/kernel.sectors)"; 	echo "[INFO] image bytes=$$(stat -c%s $(BUILD)/berged-os-0.0.1.img)"

run: image
	qemu-system-x86_64 -drive format=raw,file=$(BUILD)/berged-os-0.0.1.img -display none -serial stdio -monitor none -no-reboot -no-shutdown

boot-test: image
	./tools/boot-test.sh

debug: image
	qemu-system-x86_64 -drive format=raw,file=$(BUILD)/berged-os-0.0.1.img -display none -serial stdio -monitor none -no-reboot -no-shutdown -d int,cpu_reset,guest_errors -D qemu.log

clean:
	rm -rf $(BUILD)
