#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/../../scripts/common/utility.sh"

log_script_start "$0"

DEPLOYMENT=$(argument_extract "--deployment" "$@") && (argument_display "--deployment" true "$@")

# TODO: reidenzon - This can get stuck if pod "image" does NOT exist... maybe need a loop here instead?!
# https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#deployment-status

log_script_event "Status..."
kubectl rollout status deployment/"${DEPLOYMENT}" --watch

log_script_event "Result..."
kubectl get all --selector=app="${DEPLOYMENT}"
kubectl get deployment/"${DEPLOYMENT}"

log_script_end "$0"
