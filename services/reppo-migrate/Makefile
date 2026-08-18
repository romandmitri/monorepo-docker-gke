MIGRATE_CONTAINER := reppo-migrate
MIGRATE_DIRECTORY := ${ROOT_DIRECTORY}/services/reppo-migrate

# == LOCAL ===============================

reppo-migrate-local-bash:
	@ make reppo-migrate-local-run command="bash" network=true

reppo-migrate-local-create:
	@ make reppo-migrate-local-run command="scripts/local-create.sh --service=$(service) --name=$(name)"

reppo-migrate-local-generate:
	@ make reppo-migrate-local-run command="scripts/local-generate.sh" network=true

reppo-migrate-local-install:
	@ make reppo-migrate-local-run command="scripts/local-install.sh" # network=true

reppo-migrate-local-migrate:
	@ make reppo-migrate-local-run command="scripts/local-migrate.sh" network=true
	@ # make reppo-migrate-local-generate

reppo-migrate-local-run:
	@ ${ROOT_DIRECTORY}/scripts/local-run-build.sh --folder="${MIGRATE_DIRECTORY}" --file=Dockerfile.local --tag="${MIGRATE_CONTAINER}-run"
	@ docker run -it --rm \
		$$(if [ "$(network)" = "true" ]; then echo "--network reppo"; fi) \
		-v ${MIGRATE_DIRECTORY}:/src \
		-v ${ROOT_DIRECTORY}/scripts/common:/src/scripts/common \
		-w /src \
		"${MIGRATE_CONTAINER}-run" \
		bash -c "$(command)"

reppo-migrate-local-secrets:
	@ make reppo-infrastructure-local-secrets service="reppo-migrate"

reppo-migrate-local-version:
	@ make reppo-migrate-local-run command="scripts/local-version.sh --version=$(v)"

# == RUNNER ============================

reppo-migrate-runner-install:
	@ make reppo-migrate-runner-run command="scripts/local-install.sh" # network=true

reppo-migrate-runner-migrate:
	@ make reppo-migrate-runner-run command="scripts/local-migrate.sh" network=true
	@ # make reppo-migrate-local-generate

reppo-migrate-runner-run:
	@ #TODO: reidenzon - Use Dockerfile.runner w/ alpine image instead!
	@ ${ROOT_DIRECTORY}/scripts/local-run-build.sh --folder="${MIGRATE_DIRECTORY}" --file=Dockerfile.local --tag="${MIGRATE_CONTAINER}-run"
	@ docker run -i --rm \
		$$(if [ "$(network)" = "true" ]; then echo "--network reppo"; fi) \
		-v ${MIGRATE_DIRECTORY}:/src \
		-v ${ROOT_DIRECTORY}/scripts/common:/src/scripts/common \
		-w /src \
		"${MIGRATE_CONTAINER}-run" \
		bash -c "$(command)"
