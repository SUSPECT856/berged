.code16
.section .text
.globl _start
_start:
 cli
 movb %dl,boot_drive
 xorw %ax,%ax
 movw %ax,%ds
 movw %ax,%es
 movw %ax,%ss
 movw $0x7000,%sp
 movw $kernel_dap,%si
 movb boot_drive,%dl
 movb $0x42,%ah
 int $0x13
 jc disk_error
 inb $0x92
 orb $0x02,%al
 andb $0xfe,%al
 outb %al,$0x92
 lgdt gdt_desc
 movl %cr0,%eax
 orl $1,%eax
 movl %eax,%cr0
 ljmp $0x08,$protected_mode
disk_error:
 cli
1: hlt
 jmp 1b
.code32
protected_mode:
 movw $0x10,%ax
 movw %ax,%ds
 movw %ax,%es
 movw %ax,%ss
 movw %ax,%fs
 movw %ax,%gs
 movl $0x80000,%esp
 cld
 movl $0x10000,%esi
 movl $0x100000,%edi
 movl $(KERNEL_BYTES/4),%ecx
 rep movsl
 movl $pml4,%edi
 xorl %eax,%eax
 movl $(4096*3/4),%ecx
 rep stosl
 movl $pdpt,%eax
 orl $3,%eax
 movl %eax,pml4
 movl $pd,%eax
 orl $3,%eax
 movl %eax,pdpt
 movl $0x83,pd
 movl $pml4,%eax
 movl %eax,%cr3
 movl %cr4,%eax
 orl $0x20,%eax
 movl %eax,%cr4
 movl $0xC0000080,%ecx
 rdmsr
 orl $0x100,%eax
 wrmsr
 movl %cr0,%eax
 orl $0x80000000,%eax
 movl %eax,%cr0
 ljmp $0x18,$long_mode
.code64
long_mode:
 movw $0x10,%ax
 movw %ax,%ds
 movw %ax,%es
 movw %ax,%ss
 xorw %ax,%ax
 movw %ax,%fs
 movw %ax,%gs
 movq $0x80000,%rsp
 movq $0x100000,%rax
 jmp *%rax
.section .data
.align 8
kernel_dap:
 .byte 0x10,0
 .word KERNEL_SECTORS
 .word 0
 .word 0x1000
 .quad KERNEL_LBA
boot_drive: .byte 0
.align 8
gdt:
 .quad 0
 .quad 0x00cf9a000000ffff
 .quad 0x00cf92000000ffff
 .quad 0x00af9a000000ffff
gdt_desc:
 .word (gdt_desc-gdt-1)
 .long gdt
.align 4096
pml4: .space 4096,0
pdpt: .space 4096,0
pd: .space 4096,0
