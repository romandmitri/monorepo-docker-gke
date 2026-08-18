#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

DIR=$(dirname "${BASH_SOURCE[0]}")
source "${DIR}/common/utility.sh"

log_script_start "$0"

prepare_variables
prepare_environment

service_install

log_script_end "$0"

log_tips
