#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/../../scripts/common/utility.sh"

function kubectl_secret_create_json() {
	SECRET="$1"
	VALUE="$2"

	LOWER=$(kubectl_secret_lower "${SECRET}")
	FILE_JSON="${LOWER}.json"
	echo "${VALUE}" >"${FILE_JSON}"

	kubectl_secret_delete "${LOWER}"
	kubectl create secret generic "${LOWER}" --from-file="${FILE_JSON}"
}

function kubectl_secret_delete() {
	SECRET="$1"
	if kubectl_secret_exists "${SECRET}"; then
#		echo "Deleting... $(yellow "${SECRET}")"
		kubectl delete "secret/${SECRET}"
	fi
}

function kubectl_secret_exists() {
	SECRET="$1"
	SECRET_RECON=$(kubectl get secrets | grep -c "^${SECRET} " || true)
	[[ "${SECRET_RECON}" -eq 1 ]]
}

function kubectl_secret_lower() {
	SECRET="$1"
	LOWER=$(echo "${SECRET}" | tr '[:upper:]' '[:lower:]' | tr '_' '-')
	echo "${LOWER}"
}
