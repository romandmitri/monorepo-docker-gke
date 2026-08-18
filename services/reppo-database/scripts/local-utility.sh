#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

DIR=$(dirname "${BASH_SOURCE[0]}")
source "$DIR/common/utility.sh"

function connection_string() {
	echo "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost/${POSTGRES_DB}"
}

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
