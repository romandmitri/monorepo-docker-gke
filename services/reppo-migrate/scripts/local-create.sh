#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

DIR=$(dirname "${BASH_SOURCE[0]}")
source "$DIR/local-utility.sh"

log_script_start "$0"

NAME=$(argument_extract "--name" "$@") && (argument_display "--name" "$@")

dotenv -c -- kysely migrate:make "${NAME}"

log_script_end "$0"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
