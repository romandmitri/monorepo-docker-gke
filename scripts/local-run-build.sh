#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

DIR=$(dirname "${BASH_SOURCE[0]}")
source "${DIR}/common/utility.sh"

log_script_start "$0"

FOLDER=$(argument_extract "--folder" "$@") && (argument_display "--folder" true "$@")
FILE=$(argument_extract "--file" "$@") && (argument_display "--file" true "$@")
TAG=$(argument_extract "--tag" "$@") && (argument_display "--tag" true "$@")

prepare_variables

(cd "${FOLDER}" && docker build \
	${BUILD_ARGS_OWNER} \
	--file="${FILE}" \
	--quiet \
	--tag="${TAG}" \
	.)

log_script_end "$0"
