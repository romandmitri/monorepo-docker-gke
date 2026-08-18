#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

DIR=$(dirname "${BASH_SOURCE[0]}")
source "$DIR/local-utility.sh"

log_script_start "$0"

# Failsafe, make sure ENVs exist.
touch .env
touch .env.local

# Copy to mounted volume so IDE on host machine can recognize binaries.
mkdir -p /src/bin
cp -f /usr/local/bin/node /src/bin/node
cp -f /usr/local/bin/pnpm /src/bin/pnpm

# Set store-dir to mounted folder for re-use after reboot
pnpm config set store-dir /src/pnpm --global
pnpm install

log_script_end "$0"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
