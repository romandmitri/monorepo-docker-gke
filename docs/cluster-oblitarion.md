# Cluster Obliteration

These instructions cover how to completely rebuild/deploy to the `staging` cluster.

## Prerequisites

* GCP Project (with Kubernetes, Cloud SQL, etc...) has been provisioned (via `terraform`).
* You have permissions.

--- 

## Steps

### Login

Make sure you have permissions by running the login command.

```
make local-login
```

### Database

Connect to the `staging` database.

```
make reppo-database-cluster-stage-connect
```

Drop and create the schema.

```
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

Manually trigger `staging` migration via `reppo-migrate` workflow in GitHub Actions:  
https://github.com/romandmitri/reppo/actions/workflows/reppo-migrate.yml

### Import

Import data using `reppo-api` in CLI mode. The data lives in the Google Drive:  
https://drive.google.com/drive/folders/1KPwk458tX_thLLlwYUGRTBYM4lW_fake

Connect (via `bash`) into the `reppo-api` container in `staging` cluster.

```
make reppo-api-cluster-stage-bash
```

Run the following commands, adjust `--tab` argument as needed.

```
npm run server-cli -- group-import --tab=cluster
npm run server-cli -- user-import --tab=cluster
npm run server-cli -- agent-import --tab=cluster
npm run server-cli -- agent-version-import --tab=cluster
```

### Confirmation

Everything should be working now, try it...  
https://reppo.cheeseindustries.ca/dashboard
