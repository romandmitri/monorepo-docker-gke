#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/../../scripts/common/utility.sh"

log_script_start "$0"

RESOURCE=$(argument_extract "--resource" "$@") && (argument_display "--resource" true "$@")

# TODO: reidenzon - Fix this!
# Need to confirm that IMAGE exists, otherwise pods will NOT start and "kubectl-deployment-status.sh" script
# will be stuck on --watch step.
# Can do a "docker pull" here and should be fine... just takes longer.

log_script_event "Replacing..."

log_script_event "Applying..."
kubectl apply -f "${RESOURCE}"

log_script_end "$0"
