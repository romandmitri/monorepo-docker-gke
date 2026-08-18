#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/local-utility.sh"

log_script_start "$0"

IS_CLEAR=$(argument_extract "--clear" "$@") && (argument_display "--clear" "$@")

# ================ CLEAR =================================

# TODO: reidenzon - Confirm gcloud connection, if fails, clear login into, force login!

if [ "${IS_CLEAR}" == "true" ]; then

	# https://unix.stackexchange.com/questions/77127/rm-rf-all-files-and-all-hidden-files-without-error
	log_script_event "Clearing ALL configs..."
	rm -Rf /home/user/* /home/user/.[!.]* /home/user/..?*
	touch /home/user/.gitkeep
fi


# ================ Google Cloud =================================

GCLOUD_AUTH_LIST_COUNT=$(gcloud auth list --format="value(account)" | wc -l)

if [ "${GCLOUD_AUTH_LIST_COUNT}" -eq 0 ]; then
	log_script_event "Authentication with GCP (Google Cloud Platform)..."
	gcloud auth login --brief --update-adc
	gcloud auth list
fi

# ================ Terraform =================================

log_script_event "Terraform..."
(cd terraform/states/output && terraform init && terraform output)

# ================ Kubernetes =================================

log_script_event "Generate [.kube/config] file for Kubernetes..."
echo "Removing $(cyan ".kube/config") file..."
#mkdir -p /home/user/.kube
rm -f /home/user/.kube/config
#kubectl_context_create "reppo-local" "cheese-reppo-c-local-01"
kubectl_context_create "reppo-dev" "cheese-reppo-c-dev-01"
kubectl_context_create "reppo-stage" "cheese-reppo-c-stage-01"
kubectl_context_create "reppo-prod" "cheese-reppo-c-prod-01" || true

log_script_event "Kubernetes, confirmation..."
kubectl config get-contexts


log_script_end "$0"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
