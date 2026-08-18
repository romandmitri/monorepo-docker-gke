# Terraform

The resources in Google Cloud Platform are managed from the following Service Account:

```
terraform@reppo-terraform.iam.gserviceaccount.com
```

Multiple state files are located in `reppo-terraform` project, specifically in `cheese-reppo-terraform` bucket.

## Modules

The modules have a loose dependency in this order:

* `folder`
* `common`
* `local`
* `runner`
* `cluster-*`

For example, the `folder` module must exist before `cluster-*` is created.

## Impersonate

Members in `gcp-organization-admins@company.com` group are allowed to impersonate the terraform service account.

Terraform is configured to impersonate automatically.

## Plan, Apply

> **WARNING**  
> Always coordinate with the team to avoid rollback of unmerged terraform changes.

1. Enter local `reppo-infrastructure` container using `make reppo-infrastructure-local-bash` command.
2. Change directory into relevant state, ie: `cd terraform/states/XXX`
3. Run `terraform init` to setup dependencies.
4. Run `terraform apply` as needed. Refer to **Modules** section above for dependency order.

---

## Troubleshooting

### Error reads `impersonate: unable to generate access token` and `invalid_grant` message.

You either do NOT have permissions or the token has expired. Login and try again:

```
make local-login
```
