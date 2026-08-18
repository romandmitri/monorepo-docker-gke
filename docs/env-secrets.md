# ENVs (aka Secrets)

All ENVs are stored in Google Cloud Secret Manager.

Each service reads ENVs from their `SERVICE/.env` file.

* You can override ENVs for you `local` environment via `SERVICE/.env.local` file.

## Fetch

Fetch the latest ENV values to your `local` environment with any of the following commands:

```
make local-secrets
```

```
make reppo-api-local-secrets
make reppo-dashboard-local-secrets
make reppo-migrate-local-secrets
make reppo-proxy-local-secrets
make reppo-website-local-secrets
```

> REMINDER
> Latest values are fetched automatically during `make local-boot` execution.

## Manage

Secrets are managed with `terraform` via `reppo-infrastructure` container.

The full list of service-specific ENVs can be found in [secrets.tf](../services/reppo-infrastructure/terraform/modules/_/secrets/secrets.tf) file and modified
as needed.

Once modified, you can follow [terraform/README.md](../services/reppo-infrastructre/terraform/README.md) for `terraform apply` instructions.

Start with `local` and apply to all other environments if you have permissions do so.

> **WARNING**  
> Always coordinate with the team to avoid rollback of unmerged terraform changes.

Make a note of the any modified (ie: added, removed, deprecated) ENVs in the `release/vXXX.md` file.

Next, set the ENV values in Secret Manager (see below).

## Update

You can update specific ENV values in Google Cloud Secret Manager.

* [cheese-reppo-local-01](https://console.cloud.google.com/security/secret-manager?project=cheese-reppo-local-01)
* [cheese-reppo-runner-01](https://console.cloud.google.com/security/secret-manager?project=cheese-reppo-runner-01)
* [cheese-reppo-c-dev-01](https://console.cloud.google.com/security/secret-manager?project=cheese-reppo-c-dev-01)
* [cheese-reppo-c-stage-01](https://console.cloud.google.com/security/secret-manager?project=cheese-reppo-c-stage-01)
* [cheese-reppo-c-prod-01](https://console.cloud.google.com/security/secret-manager?project=cheese-reppo-c-prod-01)

## Deployments

Secrets are copied from Secret Manager into the Kubernetes cluster `secrets` resource (s) **automatically** during relevant service deployments.

To **manually** update ENvs in a running container (without a code change):

* Find a previous deployment job in [GitHub Actions](https://github.com/cheese-app-inc/reppo/actions) and run it again.
* Wait for the secrets to be copied from Secret Manager into the Kubernetes cluster.
* Next, manually delete the relevant replicaset (s) to force pods to restart and load latest secret values.

To delete a replicate set:

```
make reppo-infrastructure-local-bash

kubectl --context=CONTEXT get all
kubectl --context=reppo-dev get all
kubectl --context=reppo-stage get all
kubectl --context=reppo-prod get all

kubectl --context=CONTEXT delete replicaset.apps/reppo-api-XXX
kubectl --context=CONTEXT delete replicaset.apps/reppo-dashboard-XXX
kubectl --context=CONTEXT delete replicaset.apps/reppo-website-XXX
```
