#!/bin/bash

# This script will determine current VERSION value and tag current branch.
# This should be executed on [main] branch only!

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/../../scripts/common/utility.sh"

log_script_start "$0"

# =====================================

log_script_event "Version..."

FILE="VERSION"
echo "File... $(blue "${FILE}")"

VERSION=$(version_get "${FILE}")
echo "Version... $(yellow "${VERSION}")"

TAG="v${VERSION}"
echo "Tag... $(green "${TAG}")"

# =====================================

log_script_event "Commit..."

git config user.name "github"
git config user.email "github@cheese.app"
git tag "${TAG}"
git push origin "${TAG}"

# =====================================

log_script_end "$0"
