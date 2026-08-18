API_CONTAINER := reppo-api
API_DIRECTORY := ${ROOT_DIRECTORY}/services/reppo-api

# == LOCAL ===============================

reppo-api-local-bash:
	@ docker exec -it ${API_CONTAINER} bash

reppo-api-local-install:
	@ make reppo-api-local-run command="scripts/local-install.sh" # network=true

reppo-api-local-logs:
	@ docker logs -f --tail=100 ${API_CONTAINER}

reppo-api-local-restart:
	@ docker restart ${API_CONTAINER}

reppo-api-local-restart-logs:
	@ make reppo-api-local-restart
	@ make reppo-api-local-logs

reppo-api-local-email:
	@ make reppo-api-local-run command="pnpm local-email" port="2012:2012"

reppo-api-local-run:
	@ ${ROOT_DIRECTORY}/scripts/local-run-build.sh --folder="${API_DIRECTORY}" --file=Dockerfile.local --tag="${API_CONTAINER}-run"
	@ docker run -it --rm \
		$$(if [ "$(network)" = "true" ]; then echo "--network reppo"; fi) \
		$$(if [ -n "$(port)" ]; then echo "-p $(port)"; fi) \
		-v ${API_DIRECTORY}:/src \
		-v ${ROOT_DIRECTORY}/scripts/common:/src/scripts/common \
		-w /src \
		"${API_CONTAINER}-run" \
		bash -c "${command}"

reppo-api-local-secrets:
	@ make reppo-infrastructure-local-secrets service="reppo-api"

reppo-api-local-seed:
	@ make reppo-api-local-run command="scripts/local-seed.sh" network=true

reppo-api-local-test-watch:
	@ make reppo-api-local-run command="pnpm local-test-watch --pattern=$(pattern)" network=true

reppo-api-local-version:
	@ make reppo-api-local-run command="scripts/local-version.sh --version=$(v)"

reppo-api-local-watch:
	@ make reppo-api-local-run command="pnpm local-watch" # network=true

# == RUNNER ===============================

reppo-api-runner-install:
	@ make reppo-api-runner-run command="scripts/local-install.sh" # network=true

reppo-api-runner-run:
	@ #TODO: reidenzon - Use Dockerfile.runner w/ alpine image instead!
	@ ${ROOT_DIRECTORY}/scripts/local-run-build.sh --folder="${API_DIRECTORY}" --file=Dockerfile.local --tag="${API_CONTAINER}-run"
	@ docker run -i --rm \
		$$(if [ "$(network)" = "true" ]; then echo "--network reppo"; fi) \
		-v ${API_DIRECTORY}:/src \
		-v ${ROOT_DIRECTORY}/scripts/common:/src/scripts/common \
		-w /src \
		"${API_CONTAINER}-run" \
		bash -c "${command}"

reppo-api-runner-seed:
	@ make reppo-api-runner-run command="scripts/local-seed.sh" network=true

reppo-api-runner-test:
	@ make reppo-api-runner-run command="pnpm runner-test" network=true

reppo-api-runner-type:
	@ make reppo-api-runner-run command="pnpm runner-type" network=true

# == CLUSTER ===============================

reppo-api-cluster-bash:
	@ make reppo-infrastructure-local-run command="kubectl --context=$(context) exec -it deployment/${API_CONTAINER} -- sh"

reppo-api-cluster-logs:
	@ make reppo-infrastructure-local-run command="kubectl --context=$(context) logs -f --selector=app=${API_CONTAINER}"

# == CLUSTER: DEV ===============================

reppo-api-cluster-dev-bash:
	@ make reppo-api-cluster-bash context=reppo-dev

reppo-api-cluster-dev-logs:
	@ make reppo-api-cluster-logs context=reppo-dev

# == CLUSTER: STAGE ===============================

reppo-api-cluster-stage-bash:
	@ make reppo-api-cluster-bash context=reppo-stage

reppo-api-cluster-stage-logs:
	@ make reppo-api-cluster-logs context=reppo-stage

# == CLUSTERL PROD ===============================

reppo-api-cluster-prod-bash:
	@ make reppo-api-cluster-bash context=reppo-prod

reppo-api-cluster-prod-logs:
	@ make reppo-api-cluster-logs context=reppo-prod
