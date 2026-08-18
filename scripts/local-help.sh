#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

DIR=$(dirname "${BASH_SOURCE[0]}")
source "${DIR}/common/utility.sh"

prepare_variables

echo ""
echo ""
echo "Welcome to $(cyan_light "reppo") project!!!"
echo ""

log_facts
log_tips
