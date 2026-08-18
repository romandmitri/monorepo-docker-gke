#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/color.sh"

function env_value_set() {
	FILE="$1"
	VARIABLE="$2"
	VALUE="$3"

	log_script_event "env_value_set"
	echo -n "File$(yellow "${FILE}") "
	echo -n "Variable$(yellow "${VARIABLE}") "
	echo -n "Value$(yellow "${VALUE}") "
	echo ""

	if [ ! -f "${FILE}" ]; then
		echo -n "File, creating... $(yellow "${FILE}")... "
		touch "${FILE}"
		green "OK"
	fi

	if grep -q "^${VARIABLE}=" "${FILE}"; then
		echo -n "Variable: updating... "
		if [ "$(uname -s)" == "Darwin" ]; then
			sed -i'' -e "s|^${VARIABLE}=.*|${VARIABLE}=${VALUE}|" "${FILE}"
		else
			sed -i'' -e "/^${VARIABLE}=/c${VARIABLE}=${VALUE}" "${FILE}"
		fi
	else
		echo -n "Variable: adding... "
		echo "${VARIABLE}=${VALUE}" >> "${FILE}"
	fi

	echo -n "sorting... "
	sort "${FILE}" -o "${FILE}"

	green "OK"
}

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
