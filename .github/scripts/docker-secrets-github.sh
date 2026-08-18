#!/bin/bash

# Use this script to create ".env.github" file to add/copy into Dockerfile.cluster image.

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/../../scripts/common/utility.sh"

log_script_start "$0"

FILE=".env.github"

log_script_event "ENVs..."
env | grep "^GITHUB_" | sort > "${FILE}"
cat_file_env "${FILE}"

log_script_end "$0"
