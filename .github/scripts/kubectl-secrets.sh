#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/../../scripts/common/utility.sh"
source "$(dirname "${BASH_SOURCE[0]}")/kubectl-secrets-utility.sh"

log_script_start "$0"

PROJECT=$(gcloud config get-value project)
SERVICE=$(argument_extract "--service" "$@") && (argument_display "--service" true "$@")

log_script_event "Variables..."
echo "Project... $(yellow "${PROJECT}")"
echo "Service... $(yellow "${SERVICE}")"

log_script_event "Secrets..."
SECRETS_DIR=$(kubectl_secret_list "${PROJECT}" "${SERVICE}")

FILE="${SERVICE}.env"
touch "${FILE}"

for SECRET_FILE in "${SECRETS_DIR}"/*; do
	[ -f "${SECRET_FILE}" ] || continue
	SECRET=$(basename "${SECRET_FILE}")

	echo -n "Secret... $(cyan "${SECRET}")... "
	VALUE=$(cat "${SECRET_FILE}")
	green "$VALUE"

	if [[ "${SECRET}" == "REPPO_API_GOOGLE_CREDENTIALS" ]]; then
		kubectl_secret_create_json "${SECRET}" "${VALUE}"
	else
		HIDDEN=$(env_value_set "${FILE}" "${SECRET}" "${VALUE}")
	fi
done

SECRET="${SERVICE}"
kubectl_secret_delete "${SECRET}"
kubectl create secret generic "${SECRET}" --from-env-file="${FILE}"

log_script_event "Kubernetes..."
kubectl get secrets --show-labels

log_script_end "$0"
