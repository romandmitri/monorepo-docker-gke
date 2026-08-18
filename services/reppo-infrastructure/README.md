# mess-infrastructure

This service:

* Uses `terraform` to manage GCP infrastructure.
* Has `gcloud` for GCP authentication.
* Has `kubectl` for managing Kubernetes clusters.

```
make reppo-infrastructure-local-bash
```

## Infrastructure

The `reppo` repository is hosted on Google Cloud with relevant folders/projects:

* `reppo` (folder)
* `reppo-common` (project)
    * Uses `Cloud Storage` to...
        * Host **public** assets, ie: email.
        * Host objects for import into projects during seeding.
    * Uses `Google Artifact Registry` for service Docker images.
        * Identical (per-commit hash) image is applied to Kubernetes containers in each cluster.
* `reppo-local` (project)
    * Uses `Secret Manager` to store default ENV values, these are downloaded during `make local-boot` for local development.
    * Has `Cloud Storage` for use with local development.
* `reppo-cluster-*` (projects)
    * Uses Kubernetes (accessible via `kubectl` in `reppo-infrastructure` container) for service containers.
    * Uses `Secret Manager` to store project-specific values.
        * These need to be copied into Kubernetes to take effect in containers.
    * Has `Cloud Storage` for storage.
    * Has `Cloud SQL` (PostgreSQL) for database.

### Terraform

See `/terraform` folder for details on orchestrating Google Cloud infrastructure.

### Kubernetes

Access clusters using `kubectl` command as follows:

```
kubectl --context=CONTEXT get all
kubectl --context=reppo-stage get all
kubectl --context=reppo-prod get all
```

> To avoid confusion, always use `--context` argument in case you need to share screenshots.
