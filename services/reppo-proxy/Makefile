PROXY_CONTAINER := reppo-proxy
PROXY_DIRECTORY := ${ROOT_DIRECTORY}/services/reppo-proxy

# == LOCAL ================================

reppo-proxy-local-bash:
	@ docker exec -it ${PROXY_CONTAINER} sh

reppo-proxy-local-logs:
	@ docker logs -f --tail=100 ${PROXY_CONTAINER}

reppo-proxy-local-install:
	@ make reppo-proxy-local-run command="scripts/local-install.sh" # network=true

reppo-proxy-local-restart:
	@ docker restart ${PROXY_CONTAINER}

reppo-proxy-local-restart-logs:
	@ make reppo-proxy-local-restart
	@ make reppo-proxy-local-logs

reppo-proxy-local-run:
	@ ${ROOT_DIRECTORY}/scripts/local-run-build.sh --folder="${PROXY_DIRECTORY}" --file=Dockerfile.local --tag="${PROXY_CONTAINER}-run"
	@ docker run -it --rm \
		$$(if [ "$(network)" = "true" ]; then echo "--network reppo"; fi) \
		-u user \
		-v ${PROXY_DIRECTORY}:/src \
		-v ${ROOT_DIRECTORY}/scripts/common:/src/scripts/common \
		-w /src \
		"${PROXY_CONTAINER}-run" \
		bash -c "$(command)"

reppo-proxy-local-secrets:
	@ make reppo-infrastructure-local-secrets service="reppo-proxy"

# == RUNNER ==============================

reppo-proxy-runner-install:
	@ make reppo-proxy-runner-run command="scripts/local-install.sh" # network=true

reppo-proxy-runner-run:
	@ ${ROOT_DIRECTORY}/scripts/local-run-build.sh --folder="${PROXY_DIRECTORY}" --file=Dockerfile.local --tag="${PROXY_CONTAINER}-run"
	@ docker run -i --rm \
		$$(if [ "$(network)" = "true" ]; then echo "--network reppo"; fi) \
		-u user \
		-v ${PROXY_DIRECTORY}:/src \
		-v ${ROOT_DIRECTORY}/scripts/common:/src/scripts/common \
		-w /src \
		"${PROXY_CONTAINER}-run" \
		bash -c "$(command)"
