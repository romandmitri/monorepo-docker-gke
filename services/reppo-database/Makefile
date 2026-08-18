DATABASE_CONTAINER := reppo-database
DATABASE_DIRECTORY := ${ROOT_DIRECTORY}/services/reppo-database

# == LOCAL ===============================

reppo-database-local-bash:
	@ docker exec -it ${DATABASE_CONTAINER} bash

reppo-database-local-connect:
	@ docker exec -it ${DATABASE_CONTAINER} scripts/local-connect.sh

reppo-database-local-dump:
	@ docker exec -i ${DATABASE_CONTAINER} scripts/local-dump.sh --file=$(file)

reppo-database-local-logs:
	@ docker logs -f --tail=100 ${DATABASE_CONTAINER}

reppo-database-local-restart:
	@ docker restart ${DATABASE_CONTAINER}

reppo-database-local-restore:
	@ docker exec -i ${DATABASE_CONTAINER} scripts/local-restore.sh --file=$(file)

# == CLUSTER ===============================

reppo-database-cluster-connect:
	@ make reppo-infrastructure-local-run command="kubectl --context=$(context) exec -it deployment/${API_CONTAINER} -- /src/scripts/cluster-psql.sh"

reppo-database-cluster-dump:
	@ make reppo-infrastructure-local-run command="scripts/local-dump.sh --project=$(project)"

# == CLUSTER: DEV ===============================

reppo-database-cluster-dev-connect:
	@ make reppo-database-cluster-connect context=reppo-dev

reppo-database-cluster-dev-dump:
	@ make reppo-database-cluster-dump project=cheese-reppo-c-dev-01

# == CLUSTER: STAGE ===============================

reppo-database-cluster-stage-connect:
	@ make reppo-database-cluster-connect context=reppo-stage

reppo-database-cluster-stage-dump:
	@ make reppo-database-cluster-dump project=cheese-reppo-c-stage-01

# == CLUSTER: PROD ===============================

reppo-database-cluster-prod-connect:
	@ make reppo-database-cluster-connect context=reppo-prod

reppo-database-cluster-prod-dump:
	@ make reppo-database-cluster-dump project=cheese-reppo-c-prod-01
