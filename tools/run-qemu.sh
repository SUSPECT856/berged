#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if ! command -v qemu-system-x86_64 >/dev/null 2>&1; then
  echo "QEMU is not installed in this environment." >&2
  exit 127
fi
make
exec qemu-system-x86_64 -drive format=raw,file=build/berged-os-0.0.1.img -display none -serial stdio -monitor none -no-reboot -no-shutdown
