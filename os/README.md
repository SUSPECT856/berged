# BERGED OS 0.0.1

Real x86_64 bootable-core project, isolated under `os/` so the existing BERGED web project remains intact.

Scope:
- BIOS stage1 -> stage2
- protected mode -> paging -> long mode
- freestanding kernel linked at 0x100000
- VGA + COM1 serial console
- polling keyboard
- help/about/clear/reboot/shutdown paths
- deterministic image build
- QEMU headless CI smoke test

Build:
```bash
cd os
make
make check
make boot-test
```

A QEMU boot is only considered tested when the real smoke test passes.
