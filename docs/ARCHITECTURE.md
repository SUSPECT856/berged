# BERGED OS 0.0.1 Architecture

Target: x86_64 desktop/laptop, BIOS/legacy boot for the first VM milestone.

`BIOS -> stage1 -> stage2 -> protected mode -> page tables -> long mode -> kernel @ 0x100000`

Stage1 loads stage2 at 0x8000 using BIOS INT 13h extensions.
Stage2 loads the padded kernel at 0x10000, copies it to 0x100000, enables A20, installs GDT, enables PAE/EFER.LME/paging, and enters 64-bit mode.

0.0.1 intentionally contains no desktop, app store, AI UI, or unsupported compatibility claims.
