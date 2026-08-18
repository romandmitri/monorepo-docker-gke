DASHBOARD_CONTAINER := reppo-dashboard
DASHBOARD_DIRECTORY := ${ROOT_DIRECTORY}/services/reppo-dashboard

# == LOCAL ===============================

reppo-dashboard-local-bash:
	@ docker exec -it ${DASHBOARD_CONTAINER} bash

reppo-dashboard-local-install:
	@ make reppo-dashboard-local-run command="scripts/local-install.sh" # network=true

reppo-dashboard-local-logs:
	@ docker logs -f --tail=100 ${DASHBOARD_CONTAINER}

reppo-dashboard-local-restart:
	@ docker restart ${DASHBOARD_CONTAINER}

reppo-dashboard-local-restart-logs:
	@ make reppo-dashboard-local-restart
	@ make reppo-dashboard-local-logs

reppo-dashboard-local-run:
	@ ${ROOT_DIRECTORY}/scripts/local-run-build.sh --folder="${DASHBOARD_DIRECTORY}" --file=Dockerfile.local --tag="${DASHBOARD_CONTAINER}-run"
	@ docker run -it --rm \
		$$(if [ "$(network)" = "true" ]; then echo "--network reppo"; fi) \
		-v ${DASHBOARD_DIRECTORY}:/src \
		-v ${ROOT_DIRECTORY}/scripts/common:/src/scripts/common \
		-w /src \
		"${DASHBOARD_CONTAINER}-run" \
		bash -c "${command}"

reppo-dashboard-local-secrets:
	@ make reppo-infrastructure-local-secrets service="reppo-dashboard"

reppo-dashboard-local-test-watch:
	@ make reppo-dashboard-local-run command="pnpm local-test-watch" # network=true

reppo-dashboard-local-version:
	@ make reppo-dashboard-local-run command="scripts/local-version.sh --version=$(v)"

reppo-dashboard-local-watch:
	@ make reppo-dashboard-local-run command="pnpm local-watch"

# == RUNNER ===============================

reppo-dashboard-runner-install:
	@ make reppo-dashboard-runner-run command="scripts/local-install.sh" # network=true

reppo-dashboard-runner-run:
	@ #TODO: reidenzon - Use Dockerfile.runner w/ alpine image instead!
	@ ${ROOT_DIRECTORY}/scripts/local-run-build.sh --folder="${DASHBOARD_DIRECTORY}" --file=Dockerfile.local --tag="${DASHBOARD_CONTAINER}-run"
	@ docker run -i --rm \
		$$(if [ "$(network)" = "true" ]; then echo "--network reppo"; fi) \
		-v ${DASHBOARD_DIRECTORY}:/src \
		-v ${ROOT_DIRECTORY}/scripts/common:/src/scripts/common \
		-w /src \
		"${DASHBOARD_CONTAINER}-run" \
		bash -c "${command}"

reppo-dashboard-runner-test:
	@ make reppo-dashboard-runner-run command="pnpm runner-test" # network=true

reppo-dashboard-runner-type:
	@ make reppo-dashboard-runner-run command="pnpm runner-type" # network=true

# == CLUSTER ===============================

reppo-dashboard-cluster-bash:
	@ make reppo-infrastructure-local-run command="kubectl --context=$(context) exec -it deployment/${DASHBOARD_CONTAINER} -- sh"

reppo-dashboard-cluster-dev-bash:
	@ make reppo-dashboard-cluster-bash context=reppo-dev

reppo-dashboard-cluster-stage-bash:
	@ make reppo-dashboard-cluster-bash context=reppo-stage

reppo-dashboard-cluster-prod-bash:
	@ make reppo-dashboard-cluster-bash context=reppo-prod
