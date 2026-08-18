#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/local-utility.sh"
source "$(dirname "${BASH_SOURCE[0]}")/../.env.local"

log_script_start "$0"

PATTERN=$(argument_extract "--pattern" "$@") && (argument_display "--pattern" "$@")

log_script_event "Watching..."

dotenv -c -- tsx --test --test-reporter=spec --watch "${PATTERN:-*.test.ts}"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
