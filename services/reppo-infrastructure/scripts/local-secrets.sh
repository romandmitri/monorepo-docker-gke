#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/local-utility.sh"

log_script_start "$0"

# See make reppo-infrastructure-local-terraform-output for local project_id value.
PROJECT="cheese-reppo-local-01"
SERVICE=$(argument_extract "--service" "$@") && (argument_display "--service" true "$@")
FOLDER="/src/services/${SERVICE}"
FILE="${FOLDER}/.env"

log_script_event "Variables..."
echo "Project... $(green "${PROJECT}")"
echo "Service... $(yellow "${SERVICE}")"
echo "Folder... $(blue "${FOLDER}")"
echo "File... $(cyan "${FILE}")"

log_script_event "Secrets..."
SECRETS_DIR=$(kubectl_secret_list "${PROJECT}" "${SERVICE}")

for SECRET_FILE in "${SECRETS_DIR}"/*; do
	[ -f "${SECRET_FILE}" ] || continue
	SECRET=$(basename "${SECRET_FILE}")

	echo -n "Secret... $(cyan "${SECRET}")... "
	VALUE=$(cat "${SECRET_FILE}")
	green "$VALUE"

	# TODO: reidenzon - Add more special keys here... or make dynamic... via label type=json or other?!
	# TODO: reidenzon - Confirm [.env.SECRET.json] filename is ok. Dotenv will ignore, but try [.e.SECRET.json] instead?!
	if [[ "${SECRET}" == "REPPO_API_GOOGLE_CREDENTIALS" ]]; then
		# Source: Google Cloud -> Service Accounts -> [PROJECT-specific account] -> Keys -> Add key -> JSON
		echo "${VALUE}" >"${FOLDER}/.env.${SECRET}.json"
	else
		HIDDEN=$(env_value_set "${FILE}" "${SECRET}" "${VALUE}")
	fi
done

log_script_event "ENVs..."
cat_file_env "${FILE}"

log_script_end "$0"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
