#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/common/utility.sh"

function kubectl_context_create() {
	CONTEXT="$1"
	PROJECT="$2"

	log_script_event "Kubernetes context..."
	echo "Context... $(yellow "${CONTEXT}")"
	echo "Project... $(yellow "${PROJECT}")"

	# The gcloud command creates a context with an automatically generated name.
	gcloud container clusters get-credentials "cluster" --region="us-east4" --project="${PROJECT}"

	# Get the automatically generated name of the context.
	CONTEXT_NAME=$(kubectl config get-contexts --no-headers -o name | grep "gke_${PROJECT}_us-east4_cluster")

	# Rename the automatically generated context to the desired name.
	kubectl config rename-context "${CONTEXT_NAME}" "${CONTEXT}"

	# Clear the current context, to force explicit use when running kubectl command.
	sed -i'' -e "s|^current-context:.*||g" "/home/user/.kube/config"

	kubectl_context_confirm "${CONTEXT}" || true
}

function kubectl_context_confirm() {
	CONTEXT="$1"

	echo "Kubernetes... $(yellow "${CONTEXT}")"
	kubectl --context="${CONTEXT}" get all
	echo ""
}

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
