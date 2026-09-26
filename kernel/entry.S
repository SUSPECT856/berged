.code64
.section .text.entry
.globl _start
.type _start,@function
_start:
 cli
 xorw %ax,%ax
 movw %ax,%ds
 movw %ax,%es
 movw %ax,%ss
 movq $0x80000,%rsp
 call kernel_main
1: hlt
 jmp 1b
.size _start,.-_start
