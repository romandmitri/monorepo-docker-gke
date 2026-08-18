#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

DIR=$(dirname "${BASH_SOURCE[0]}")
source "$DIR/local-utility.sh"

log_script_start "$0"

# == MIGRATE ===============================

#log_script_event "Before... "
#dotenv -c -- kysely migrate:list

log_script_event "Migrating... $(yellow "${REPPO_MIGRATE_DATABASE_URL}")"
dotenv -c -- kysely migrate:latest

#log_script_event "After... "
#dotenv -c -- kysely migrate:list

log_script_end "$0"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
