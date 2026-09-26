FROM mcr.microsoft.com/devcontainers/base:ubuntu

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
       build-essential binutils qemu-system-x86 gdb python3 file \
    && rm -rf /var/lib/apt/lists/*
