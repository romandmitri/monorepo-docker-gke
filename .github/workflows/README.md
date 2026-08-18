# GitHub Actions

## Environments

Google Cloud has the following relevant projects:

* `runner`
* `development`
* `staging`
* `production`

## Infrastructure

Uses GCP Kubernetes, see [reppo-infrastructure/README.md](../services/reppo-infrastructure/README.md#infrastructure) for details.

## Variables & Secrets

### Environment

### Repository

* `GCP_REPOSITORY` = `us-east4-docker.pkg.dev/cheese-reppo-common-01/docker`
    * Get this from `make reppo-infrastructure-local-terraform-output` via `common.artifact_registry_uri` value.
* `GCP_TERRAFORM_CREDENTIALS`
    * Credentials file for terraform service account.
    * TODO: reidenzon - Create GCP Workload Identity via terraform and use that instead!

---

## Reference

* https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions
* https://docs.github.com/en/actions/reference/accessing-contextual-information-about-workflow-runs
* https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect
* https://docs.github.com/en/actions/reference/workflow-commands-for-github-actions#environment-files

### Actions

* https://github.com/actions/checkout
* https://github.com/google-github-actions
* https://github.com/google-github-actions/auth
* https://github.com/google-github-actions/get-gke-credentials
