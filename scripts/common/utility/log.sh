#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/color.sh"

# ================== LOG ===============================

function log_script_start() {

	TIME_START="$(date +%s)"
	export TIME_START

	echo ""
	echo -e "START $(blue "$1")"
}

function log_script_event() {
	echo ""
	echo -e "EVENT $(magenta "$1")"
}

function log_script_todo() {
	echo ""
	echo -e "TODO $(red "$1")"
}

function log_script_end() {

	TIME_END=$(date +%s)
	TIME_TOTAL=$((TIME_END - TIME_START))

	echo ""
	echo -n -e "END $(green "$1") "
	echo -e "...done in $(green "${TIME_TOTAL}") seconds!"
	echo ""
}

function log_facts() {

	GREP_SKIP="(\.cache|\.config|\.git|\.gradle|\.kube|\.pnpm-store|\.next|\.terraform|build|gcloud|dart_tool|dist|node_modules|pnpm|tmp|vendor|yarn)"
	GREP_KEEP="\.(cluster|conf|css|dart|ejs|js|jsx|go|md|php|sh|sql|test|tf|ts|tsx|yml)$"
	GREP_TEST="(\_\_tests\_\_|\_test\.dart|\_test\.go|\.test\.|\.spec\.)"

	FORMAT="%-50s %-24s %-24s %-18s"

	echo ""
	echo "Fun Facts!"
	echo ""
	echo "  * Lines (and TODOs):"
	echo ""

	function log_facts_line() {
		DIR_LABEL="$1"
		DIR_FIND="$2"
		COUNT_CODE=$(find "${DIR_FIND}" -type f | grep -Ev "${GREP_SKIP}" | grep -E "${GREP_KEEP}" | xargs cat | wc -l)
		COUNT_TEST=$(find "${DIR_FIND}" -type f | grep -Ev "${GREP_SKIP}" | grep -E "${GREP_KEEP}" | grep -E "${GREP_TEST}" | xargs cat | wc -l)
		COUNT_TODO=$(find "${DIR_FIND}" -type f | grep -Ev "${GREP_SKIP}" | grep -E "${GREP_KEEP}" | xargs cat | grep -c "TODO") || true
		echo "      $(printf "${FORMAT}" "$(blue "${DIR_LABEL}")" "$(green "$(printf "%'d" "${COUNT_CODE}")")" "$(blue "$(printf "%'d" "${COUNT_TEST}")")" "$(yellow "$(printf "%'d" "${COUNT_TODO}")")")"
	}

	# Header.
	echo "      $(printf "${FORMAT}" "$(blue "SERVICE")" "$(green "TOTAL")" "$(blue "TEST")" "$(yellow "TODO")")"
	echo "    ----------------------------------------------------------------------"

	# Root.
	log_facts_line "/" "."

	DIR_SERVICES="services/"
	for DIR_SERVICE in services/*; do
		if [ -d "${DIR_SERVICE}" ]; then
			DIR_SERVICE="${DIR_SERVICE/${DIR_SERVICES}/}"
			log_facts_line "${DIR_SERVICE}" "services/${DIR_SERVICE}"
		fi
	done

	echo ""
	echo ""
}

function log_tips() {

	echo "Tips!"
	echo ""
	echo "  * Visit $(green_light "http://localhost:${HOST_PORT}") for $(blue_light "reppo-proxy") service."
	echo "  * Visit $(green_light "http://${HOST_IP}:${HOST_PORT}") for $(blue_light "reppo-proxy") service."
	echo ""
	echo ""
}

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
