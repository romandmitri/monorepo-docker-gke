#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

DIR=$(dirname "${BASH_SOURCE[0]}")
source "$DIR/local-utility.sh"

log_script_start "$0"

wait_for "reppo-database:5432"

# == MIGRATE ===============================

source .env
source .env.local

log_script_event "Generating... $(yellow "${REPPO_MIGRATE_DATABASE_URL}")"

# TODO: reidenzon - This needs extensive configurations to be useful.
# https://www.npmjs.com/package/kysely-codegen
kysely-codegen --dialect=postgres --out-file="/src/type/db.t.ts" --url="${REPPO_MIGRATE_DATABASE_URL}"

log_script_end "$0"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
