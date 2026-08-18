#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

DIR=$(dirname "${BASH_SOURCE[0]}")
source "$DIR/common/utility.sh"

# REMINDER: Add functions here, as needed...

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
