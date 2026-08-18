#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/color.sh"
source "$(dirname "${BASH_SOURCE[0]}")/log.sh"

# ================== KUBECTL ===============================

function kubectl_secret_list_value() {
	local PROJECT="$1"
	local SECRET="$2"
	local DIR="$3"
	local TOKEN="$4"
	local URL
	# Using CURL prevents gcloud locking in GitHub Actions workflows.
	URL="https://secretmanager.googleapis.com/v1/projects/${PROJECT}/secrets/${SECRET}/versions/latest:access"
	RESPONSE=$(curl -s -f -H "Authorization: Bearer ${TOKEN}" "${URL}")
#	VALUE=$(gcloud secrets versions access latest --secret="${SECRET}" --project="${PROJECT}")
	if [ $? -eq 0 ]; then
		VALUE=$(echo "${RESPONSE}" | jq -r .payload.data | base64 -d)
		echo "${VALUE}" > "${DIR}/${SECRET}"
	fi
}

function kubectl_secret_list() {
	local PROJECT="$1"
	local SERVICE="$2"
	local TOKEN
	local SECRETS_DIR
	TOKEN=$(gcloud auth print-access-token)
	SECRETS_DIR=$(mktemp -d)
	SECRETS=$(gcloud secrets list --filter="labels.service=${SERVICE}" --format="value(name)" --project="${PROJECT}")
	for SECRET in $SECRETS; do
		kubectl_secret_list_value "${PROJECT}" "${SECRET}" "${SECRETS_DIR}" "${TOKEN}" &
	done
	wait

	echo "${SECRETS_DIR}"
}

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
