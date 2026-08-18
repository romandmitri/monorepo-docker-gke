#!/bin/bash

# Use this script to create ".env" file to add/copy into Dockerfile.cluster image.
# This is relevant to images that need ENVs injected at build-time, ie: [reppo-website] which uses Next.js package.

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/../../scripts/common/utility.sh"

log_script_start "$0"

PROJECT=$(gcloud config get-value project)
SERVICE=$(argument_extract "--service" "$@") && (argument_display "--service" true "$@")
FILE=".env"

log_script_event "Variables..."
echo "Project... $(yellow "${PROJECT}")"
echo "Service... $(yellow "${SERVICE}")"
echo "File... $(cyan "${FILE}")"

log_script_event "Secrets..."
SECRETS_DIR=$(kubectl_secret_list "$PROJECT" "${SERVICE}")

for SECRET_FILE in "${SECRETS_DIR}"/*; do
	[ -f "${SECRET_FILE}" ] || continue
	SECRET=$(basename "${SECRET_FILE}")

	echo -n "Secret... $(cyan "${SECRET}")... "
	VALUE=$(cat "${SECRET_FILE}")
	green "$VALUE"

	# TODO: reidenzon - Add more special keys here... or make dynamic... via label type=json or other?!
	if [[ "${SECRET}" == "REPPO_API_GOOGLE_CREDENTIALS" ]]; then
		# Source: Google Cloud -> Service Accounts -> [PROJECT-specific account] -> Keys -> Add key -> JSON
		echo "${VALUE}" >".env.${SECRET}.json"
	else
		HIDDEN=$(env_value_set "${FILE}" "${SECRET}" "${VALUE}")
	fi
done

log_script_event "ENVs..."
cat_file_env "${FILE}"

log_script_end "$0"
