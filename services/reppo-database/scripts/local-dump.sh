#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/local-utility.sh"

log_script_start "$0"

FILE=$(argument_extract "--file" "$@") && (argument_display "--file" true "$@")

log_script_event "Dumping..."
pg_dump "$(connection_string)" > "tmp/${FILE}"

echo_file "${PATH_ROOT}/services/reppo-database/tmp/${FILE}"

log_script_end "$0"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
