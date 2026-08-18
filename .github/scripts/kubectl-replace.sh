#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/../../scripts/common/utility.sh"

log_script_start "$0"

RESOURCE=$(argument_extract "--resource" "$@") && (argument_display "--resource" true "$@")
KEY=$(argument_extract "--key" "$@") && (argument_display "--key" true "$@")
VALUE=$(argument_extract "--value" "$@") && (argument_display "--value" true "$@")

log_script_event "Replacing..."

sed -i'' -e "s|${KEY}|${VALUE}|g" "${RESOURCE}"/*
cat_files "${RESOURCE}/*"

log_script_end "$0"
