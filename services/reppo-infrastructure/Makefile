INFRASTRUCTURE_CONTAINER := reppo-infrastructure
INFRASTRUCTURE_DIRECTORY := ${ROOT_DIRECTORY}/services/reppo-infrastructure

# == LOCAL ===============================

reppo-infrastructure-local-bash:
	@ make reppo-infrastructure-local-run command="scripts/local-bash.sh && bash"

reppo-infrastructure-local-login:
	@ make reppo-infrastructure-local-run command="scripts/local-login.sh --clear=true"

reppo-infrastructure-local-login-ensure:
	@ make reppo-infrastructure-local-run command="scripts/local-login.sh"

reppo-infrastructure-local-secrets:
	@ make reppo-infrastructure-local-run command="scripts/local-secrets.sh --service=$(service)"

reppo-infrastructure-local-run:
	@ ${ROOT_DIRECTORY}/scripts/local-run-build.sh --folder="${INFRASTRUCTURE_DIRECTORY}" --file=Dockerfile.local --tag="${INFRASTRUCTURE_CONTAINER}-run"
	@ docker run -it --rm \
		$$(if [ "$(network)" = "true" ]; then echo "--network reppo"; fi) \
		-v ${INFRASTRUCTURE_DIRECTORY}:/src \
		-v ${INFRASTRUCTURE_DIRECTORY}/user:/home/user \
		-v ${ROOT_DIRECTORY}/scripts/common:/src/scripts/common \
		-v ${ROOT_DIRECTORY}/services:/src/services \
		-w /src \
		"${INFRASTRUCTURE_CONTAINER}-run" \
		bash -c "$(command)"

reppo-infrastructure-local-terraform-output:
	@ make reppo-infrastructure-local-run command="cd terraform/states/output && terraform init && terraform output"
