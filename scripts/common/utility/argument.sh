#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/color.sh"

function argument_extract() {
	# http://mywiki.wooledge.org/BashFAQ/035
	# https://www.cyberciti.biz/tips/bash-shell-parameter-substitution-2.html

	KEY="$1"

	for ARG in "$@"
	do
		case $ARG in
		$KEY=*)
			echo "${ARG#*=}"
			return
			;;
		esac
	done
}

function argument_display() {
	KEY="$1"
	IS_EXPECTED="$2"

	VALUE="$(argument_extract "${KEY}" "$@")"

	echo "Argument $(magenta "${KEY}")=$(yellow "${VALUE}")"

	if [ "${IS_EXPECTED}" = "true" ]; then
		if [ -z "${VALUE}" ]; then
			echo "...missing! $(red_light "${KEY}")"
			exit 1
		fi
	fi
}

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
