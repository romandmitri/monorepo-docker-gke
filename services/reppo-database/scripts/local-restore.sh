#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/local-utility.sh"

log_script_start "$0"

FILE=$(argument_extract "--file" "$@") && (argument_display "--file" true "$@")

psql "$(connection_string)" --command "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
psql "$(connection_string)" --file "tmp/${FILE}"

log_script_end "$0"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
