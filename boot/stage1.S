.code16
.section .text
.globl _start
_start:
 cli
 xorw %ax,%ax
 movw %ax,%ds
 movw %ax,%es
 movw %ax,%ss
 movw $0x7c00,%sp
 movb %dl,boot_drive
 movw $dap,%si
 movb boot_drive,%dl
 movb $0x42,%ah
 int $0x13
 jc disk_error
 ljmp $0,$0x8000
disk_error:
 cli
1: hlt
 jmp 1b
.align 2
dap:
 .byte 0x10,0
 .word STAGE2_SECTORS
 .word 0x8000
 .word 0
 .quad 1
boot_drive: .byte 0
.org 510
.word 0xaa55
