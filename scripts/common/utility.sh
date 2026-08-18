#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/utility/argument.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utility/cat.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utility/color.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utility/env.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utility/kubectl.sh"
source "$(dirname "${BASH_SOURCE[0]}")/utility/log.sh"

function prepare_variables() {

	log_script_event "Variables..."

	PATH_ROOT="$(pwd)"
	export PATH_ROOT

	UNAME=$(uname -s)

	# The following OWNER_USER/GROUP ids are taken from the HOST system and are switched to
	# from within some containers. This prevents ROOT ownership of content generated within the container.
	# This is specifically useful for content generated into shared volumes that appear on the host machine.
	OWNER_USER=$(id -u)
	OWNER_GROUP=$(id -g)

	if [ "${UNAME}" == "Darwin" ]; then
		# Unique ID to avoid collisions on MacBook with Alpine 20 group ID.
		OWNER_GROUP=501
	fi

	echo "Path... $(yellow "${PATH_ROOT}")"
	echo "Owner... $(yellow "${OWNER_USER}"):$(yellow "${OWNER_GROUP}") in $(yellow "${UNAME}")"

	BUILD_ARGS_OWNER="--build-arg OWNER_USER=${OWNER_USER} --build-arg OWNER_GROUP=${OWNER_GROUP}"
	export BUILD_ARGS_OWNER

	# https://docs.docker.com/compose/reference/envvars/#compose_project_name
	export COMPOSE_PROJECT_NAME="reppo"

	COMPOSE_FILE=$(docker_compose_file)
	export COMPOSE_FILE

	HOST_PORT=2000
	export HOST_PORT

	HOST_IP=$(host_ip_get)
	export HOST_IP
}

function prepare_environment() {
	log_script_event "Environment..."
	host_ip
}

function host_ip() {
	log_script_event "host_ip"
	UNAME="$(uname -s)"
	echo "Operating System... $(yellow "${UNAME}")"
	IP=$(host_ip_get)
	if [ -n "${IP}" ]; then
		echo "IP... $(green "${IP}")"
		env_value_set "$PATH_ROOT/services/reppo-api/.env.local" "REPPO_API_URL_BASE" "http://${IP}:${HOST_PORT}"
		env_value_set "$PATH_ROOT/services/reppo-dashboard/.env.local" "REPPO_DASHBOARD_URL_BASE" "http://${IP}:${HOST_PORT}"
		env_value_set "$PATH_ROOT/services/reppo-proxy/.env.local" "REPPO_PROXY_IP" "${IP}"
		env_value_set "$PATH_ROOT/services/reppo-website/.env.local" "NEXT_PUBLIC_REPPO_WEBSITE_URL_BASE" "http://${IP}:${HOST_PORT}"
		env_value_set "$PATH_ROOT/services/reppo-website/.env.local" "REPPO_WEBSITE_URL_BASE" "http://${IP}:${HOST_PORT}"
	else
		echo "IP... $(red_light "UNDETERMINED")"
	fi
}

function host_ip_get() {
	UNAME="$(uname -s)"
	IP=
	case "${UNAME}" in
		Darwin) # MacBook
			IP="$(ipconfig getifaddr en0 || ipconfig getifaddr en1)"
		;;
		Linux)
			IP="$(hostname -I | awk '{print $1}')"
		;;
	esac
	echo "${IP}"
}

function docker_kill_all() {

	log_script_event "Killing ALL [${COMPOSE_PROJECT_NAME}] containers..."
	CONTAINER_COUNT=$(docker ps -q --filter "name=^${COMPOSE_PROJECT_NAME}" | wc -l)
	echo "Count... $(yellow "${CONTAINER_COUNT}")"

	if [ "${CONTAINER_COUNT}" -gt 0 ]; then
		docker kill $(docker ps -q --filter "name=^${COMPOSE_PROJECT_NAME}") || true
	fi

	echo "Data..."
	docker container rm reppo-database || true
}

function docker_compose_file() {
	echo "--file=local-compose.yml"
}

function docker_compose_build() {

	log_script_event "Docker, Build..."
	echo "File... $(yellow "${COMPOSE_FILE}")"
	echo "Project... $(yellow "${COMPOSE_PROJECT_NAME}")"
	echo "Profile... $(yellow "${COMPOSE_PROFILE}")"
	echo "Args... $(yellow "${BUILD_ARGS_OWNER}")"
	echo ""

	(cd "${PATH_ROOT}/scripts" && docker compose ${COMPOSE_FILE} "--project-name=${COMPOSE_PROJECT_NAME}" "--profile=${COMPOSE_PROFILE}" build ${BUILD_ARGS_OWNER})
}

function docker_compose_up() {
	COMPOSE_PROFILE="$1"

	log_script_event "Docker, Up..."
	echo "File... $(yellow "${COMPOSE_FILE}")"
	echo "Project... $(yellow "${COMPOSE_PROJECT_NAME}")"
	echo "Profile... $(yellow "${COMPOSE_PROFILE}")"
	echo ""

	(cd "${PATH_ROOT}/scripts" && docker compose ${COMPOSE_FILE} "--project-name=${COMPOSE_PROJECT_NAME}" "--profile=${COMPOSE_PROFILE}" up --detach --no-build)
}

function docker_restart() {
	log_script_event "Restarting..."
	make_target reppo-api-local-restart
	make_target reppo-database-local-restart
	make_target reppo-dashboard-local-restart
	make_target reppo-proxy-local-restart
	make_target reppo-website-local-restart
}

function docker_ps() {
	log_script_event "Containers..."
	make_target local-docker-ps
}

function infrastructure_login() {
	log_script_event "Login..."
	make_target reppo-infrastructure-local-login-ensure
}

function infrastructure_secrets() {
	log_script_event "Secrets..."
	make_target reppo-api-local-secrets
	make_target reppo-dashboard-local-secrets
	make_target reppo-migrate-local-secrets
	make_target reppo-proxy-local-secrets
	make_target reppo-website-local-secrets
}

function make_target() {
	MAKE_TARGET="$1"

	echo "-"
	echo -n "Make... $(cyan "${MAKE_TARGET}")... "

	if make_target_exists "${MAKE_TARGET}"; then
		green "FOUND"
		echo "Calling..."
		echo ""
		(cd "${PATH_ROOT}" && make -s "${MAKE_TARGET}")
	else
		yellow "MISSING"
	fi

	echo "-"
}

# https://stackoverflow.com/questions/23849953/how-to-check-existence-of-the-target-in-a-makefile
function make_target_exists() {
	MAKE_TARGET="$1"
	MAKE_TARGET_RECON=$(make --makefile="${PATH_ROOT}/Makefile" -n "${MAKE_TARGET}" 2>&1 | grep -c "...no target?!")
	[[ "${MAKE_TARGET_RECON}" -eq 0 ]]
}

function service_install() {
	log_script_event "Service, Install..."
	make_target reppo-api-local-install
	make_target reppo-dashboard-local-install
	make_target reppo-migrate-local-install
	make_target reppo-proxy-local-install
	make_target reppo-website-local-install
}

function service_seed() {
	log_script_event "Service, Seed..."
	make_target reppo-migrate-local-migrate
	make_target reppo-api-local-seed
}

function service_version() {
	log_script_event "Version..."
	VERSION="$1"
	make_target reppo-api-local-version v="${VERSION}"
	make_target reppo-dashboard-local-version v="${VERSION}"
	make_target reppo-migrate-local-version v="${VERSION}"
	make_target reppo-website-local-version v="${VERSION}"
}

function version_get() {
	FILE="$1"
	VERSION=$(head -n 1 "${FILE}" | tr -d '[:space:]')
	echo "${VERSION}"
}

function wait_for() {
	# https://github.com/ufoscout/docker-compose-wait
	WAIT_HOSTS="$1" WAIT_TIMEOUT=180 /src/scripts/common/wait
}

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
