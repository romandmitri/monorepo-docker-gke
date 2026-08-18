#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/local-utility.sh"
source "$(dirname "${BASH_SOURCE[0]}")/../.env.local"

log_script_start "$0"

wait_for "reppo-database:5432"

log_script_event "Seeding..."

echo "Nickname... $(yellow "${REPPO_API_NICKNAME}")"
pnpm local-cli seed-all --tab=local --nickname="${REPPO_API_NICKNAME}" --level=info

log_script_end "$0"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
