#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/local-utility.sh"

PAGER=less psql "$(connection_string)"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
exec "$@"
