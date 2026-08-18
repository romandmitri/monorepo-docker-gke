#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

# TODO: reidenzon - If you want scripts, you need to COPY scripts! (in Dockerfile.cluster)
#DIR=$(dirname "${BASH_SOURCE[0]}")
#source "$DIR/local-utility.sh"

PAGER=less psql "${REPPO_API_DATABASE_URL}"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
exec "$@"
