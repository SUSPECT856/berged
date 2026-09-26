# BERGED OS 0.0.1 Status

Implemented:
- BIOS boot sector and extended disk reads
- protected mode and long mode transition
- identity-mapped 2 MiB paging
- kernel linked at 0x100000
- VGA/serial console
- polling keyboard
- help/about/clear/reboot/shutdown paths
- Make image build
- QEMU smoke-test script and CI workflow

Locally verified:
- image generation
- AA55 boot signature
- ELF entry 0x100000
- derived sector counts

Not claimed until QEMU smoke test passes:
- real VM boot
- physical hardware boot
- native ACPI shutdown
