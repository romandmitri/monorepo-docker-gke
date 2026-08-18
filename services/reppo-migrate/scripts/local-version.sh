#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

DIR=$(dirname "${BASH_SOURCE[0]}")
source "$DIR/local-utility.sh"

log_script_start "$0"

VERSION=$(argument_extract "--version" "$@") && (argument_display "--version" true "$@")

# Update package.json file.
pnpm version "${VERSION}" --allow-same-version --no-git-tag-version
echo_file "$(pwd)/package.json"

log_script_end "$0"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
