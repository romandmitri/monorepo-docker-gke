#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/color.sh"

function cat_file() {
	FILE="$1"

	log_script_event "cat_file"
	echo "File... $(yellow "${FILE}")"

	cyan "$(cat "${FILE}")"

	echo "END $(yellow "${FILE}")"
	echo ""
}

function cat_files() {
	log_script_event "cat_files"
	PATTERN="$1"
	for FILE in $PATTERN; do
		if [ -f "${FILE}" ]; then
			cat_file "$FILE"
		fi
	done
}

function cat_file_env() {
	FILE="$1"

	log_script_event "cat_file_env"
	echo "File... $(yellow "${FILE}")"

	# https://github.com/koalaman/shellcheck/wiki/SC2013
	grep -v '^ *#' <"${FILE}" | while IFS= read -r LINE; do
		KEY="$(cut -d'=' -f1 <<<"${LINE}")"
		VALUE="$(cut -d'=' -f2 <<<"${LINE}")"
		echo "$(cyan "${KEY}")=$(yellow_light "${VALUE}")"
	done

	echo ""
}

function cat_file_pem() {
	FILE="$1"
	log_script_event "cat_file_pem"
	echo "File... $(yellow "${FILE}")"
	echo "PEM..."
	red "$(cat "${FILE}")"
	echo ""
}

function cat_file_json() {
	FILE="$1"
	log_script_event "cat_file_json"
	echo "File... $(yellow "${FILE}")"
	echo "JSON... $(blue_light "$(cat "${FILE}")")"
	echo ""
}

function echo_file() {
	FILE="${1}"
	echo "↳ $(green "file://${FILE}")"
}

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
