#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/common/utility.sh"

log_script_start "$0"

prepare_variables
prepare_environment

docker_kill_all
docker_compose_build

log_script_event "Secrets..."
(cd services/reppo-api && $SCRIPTS/docker-secrets.sh --service="reppo-api")
(cd services/reppo-dashboard && $SCRIPTS/docker-secrets.sh --service="reppo-dashboard")
(cd services/reppo-migrate && $SCRIPTS/docker-secrets.sh --service="reppo-migrate")
(cd services/reppo-proxy && $SCRIPTS/docker-secrets.sh --service="reppo-proxy")

log_script_event "Service, Install..."
make_target reppo-api-runner-install
make_target reppo-dashboard-runner-install
make_target reppo-migrate-runner-install
make_target reppo-proxy-runner-install
make_target reppo-website-runner-install

docker_compose_up
docker_ps

log_script_event "Service, Seed..."
make_target reppo-migrate-runner-migrate
make_target reppo-api-runner-seed

log_script_end "$0"

log_tips
