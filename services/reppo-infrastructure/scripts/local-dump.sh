#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/local-utility.sh"

log_script_start "$0"

PROJECT=$(argument_extract "--project" "$@") && (argument_display "--project" true "$@")

TIME=$(date +'%Y%m%-d%H%M')
FILE="${PROJECT}-${TIME}.sql"
BUCKET="cheese-reppo-common-01-private"

echo "File.. $(cyan "${FILE}")"

log_script_event "Dumping..."
gcloud --project="${PROJECT}" sql export sql sql-01 "gs://${BUCKET}/database/${FILE}" --database=postgres

LINK="https://console.cloud.google.com/storage/browser/${BUCKET}/database"
echo "↳ $(green "${LINK}")"

log_script_end "$0"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
