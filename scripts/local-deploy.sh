#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

DIR=$(dirname "${BASH_SOURCE[0]}")
source "${DIR}/common/utility.sh"

log_script_start "$0"

BRANCH_CURRENT=$(git rev-parse --abbrev-ref HEAD)
BRANCH_DEPLOY=$(argument_extract "--branch" "$@") && (argument_display "--branch" true "$@")

echo ""
echo "Checkout... $(magenta "${BRANCH_DEPLOY}")"
git checkout -B "${BRANCH_DEPLOY}"

echo ""
echo "Push... $(magenta "${BRANCH_DEPLOY}")"
git push -f

echo ""
echo "Revert... $(green "${BRANCH_CURRENT}")"
git checkout "${BRANCH_CURRENT}"

log_script_end "$0"
