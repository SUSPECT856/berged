#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
make
command -v qemu-system-x86_64 >/dev/null
set +e
timeout 5s qemu-system-x86_64 -drive format=raw,file=build/berged-os-0.0.1.img -display none -serial stdio -monitor none -no-reboot -no-shutdown > qemu-serial.log 2>&1
rc=$?
set -e
cat qemu-serial.log
grep -q "BERGED OS 0.0.1" qemu-serial.log
test "$rc" = 124
