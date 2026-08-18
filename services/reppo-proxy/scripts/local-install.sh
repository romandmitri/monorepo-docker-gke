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

# TODO: reidenzon - Try to set host_ip here... can the container find it?!

log_script_end "$0"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
