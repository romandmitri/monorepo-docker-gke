WEBSITE_CONTAINER := reppo-website
WEBSITE_DIRECTORY := ${ROOT_DIRECTORY}/services/reppo-website

# == LOCAL ===============================

reppo-website-local-bash:
	@ docker exec -it ${WEBSITE_CONTAINER} bash

reppo-website-local-install:
	@ make reppo-website-local-run command="scripts/local-install.sh" # network=true

reppo-website-local-logs:
	@ docker logs -f --tail=100 ${WEBSITE_CONTAINER}

reppo-website-local-restart:
	@ docker restart ${WEBSITE_CONTAINER}

reppo-website-local-restart-logs:
	@ make reppo-website-local-restart
	@ make reppo-website-local-logs

reppo-website-local-run:
	@ ${ROOT_DIRECTORY}/scripts/local-run-build.sh --folder="${WEBSITE_DIRECTORY}" --file=Dockerfile.local --tag="${WEBSITE_CONTAINER}-run"
	@ docker run -it --rm \
		$$(if [ "$(network)" = "true" ]; then echo "--network reppo"; fi) \
		-v ${WEBSITE_DIRECTORY}:/src \
		-v ${ROOT_DIRECTORY}/scripts/common:/src/scripts/common \
		-w /src \
		"${WEBSITE_CONTAINER}-run" \
		bash -c "${command}"

reppo-website-local-secrets:
	@ make reppo-infrastructure-local-secrets service="reppo-website"

reppo-website-local-version:
	@ make reppo-website-local-run command="scripts/local-version.sh --version=$(v)"

reppo-website-local-test-watch:
	@ make reppo-website-local-run command="pnpm local-test-watch"

reppo-website-local-watch:
	@ make reppo-website-local-run command="pnpm local-watch"

# == RUNNER ================================

reppo-website-runner-install:
	@ make reppo-website-runner-run command="scripts/local-install.sh" # network=true

reppo-website-runner-run:
	@ ${ROOT_DIRECTORY}/scripts/local-run-build.sh --folder="${WEBSITE_DIRECTORY}" --file=Dockerfile.local --tag="${WEBSITE_CONTAINER}-run"
	@ docker run -i --rm \
		$$(if [ "$(network)" = "true" ]; then echo "--network reppo"; fi) \
		-v ${WEBSITE_DIRECTORY}:/src \
		-v ${ROOT_DIRECTORY}/scripts/common:/src/scripts/common \
		-w /src \
		"${WEBSITE_CONTAINER}-run" \
		bash -c "${command}"

reppo-website-runner-test:
	@ make reppo-website-runner-run command="pnpm runner-test" # network=true

reppo-website-runner-type:
	@ make reppo-website-runner-run command="pnpm runner-type" # network=true

# == CLUSTER ===============================

reppo-website-cluster-bash:
	@ make reppo-infrastructure-local-run command="kubectl --context=$(context) exec -it deployment/${WEBSITE_CONTAINER} -- sh"

reppo-website-cluster-dev-bash:
	@ make reppo-website-cluster-bash context=reppo-dev

reppo-website-cluster-stage-bash:
	@ make reppo-website-cluster-bash context=reppo-stage

reppo-website-cluster-prod-bash:
	@ make reppo-website-cluster-bash context=reppo-prod
