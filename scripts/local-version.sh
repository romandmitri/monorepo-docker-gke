#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

# ================== IMPORTS ===============================

DIR=$(dirname "${BASH_SOURCE[0]}")
source "${DIR}/common/utility.sh"

# ================== CONTENT ===============================

log_script_start "$0"

VERSION=$(argument_extract "--version" "$@") && (argument_display "--version" true "$@")

prepare_variables

# == ROOT ===============================

log_script_event "root"

FILE="${PATH_ROOT}/release/v${VERSION}.md"
if [ ! -f "${FILE}" ]; then
	touch "${FILE}"
	echo -e "# Version \`v${VERSION}\`" >> "${FILE}"
fi
echo_file "${FILE}"

FILE="${PATH_ROOT}/README.md"
sed -i'' -e "s|## Version.*|## Version \`v${VERSION}\`|g" "${FILE}"
echo_file "${FILE}"

FILE="${PATH_ROOT}/VERSION"
echo "${VERSION}" > "${FILE}"
echo_file "${FILE}"

# == SERVICES ===============================

service_version "${VERSION}"

# == GIT ===============================

log_script_todo "REMINDER: Do this manually..."

echo "git add ."
echo "git commit -am \"Version v${VERSION}\""
echo "git push"

# == END ===============================

log_script_end "$0"
