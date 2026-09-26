ENTRY(_start)
PHDRS { text PT_LOAD FLAGS(5); rodata PT_LOAD FLAGS(4); data PT_LOAD FLAGS(6); }
SECTIONS {
  . = 0x100000;
  .text : ALIGN(16) { *(.text.entry) *(.text*) } :text
  . = ALIGN(0x1000);
  .rodata : ALIGN(16) { *(.rodata*) } :rodata
  . = ALIGN(0x1000);
  .data : ALIGN(16) { *(.data*) } :data
  .bss : ALIGN(16) { *(.bss*) *(COMMON) } :data
}
