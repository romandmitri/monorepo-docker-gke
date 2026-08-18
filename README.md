# `monorepo-docker-gke`

## Version `0.0.0`

--- 

## Preface

Hi, my name is Roman Eidenzon (aka Roman Dmitri) and you are most likely looking at this to evaluate if I am a good hire, so the purpose of this repository is
to showcase my skills as an experienced architect and full-stack web developer. Specifically, this one will focus on monorepo structure, local development (via
Docker) and GCP orchestration via Terraform. This is a typical structure example and NOT a real project. Checkout
my [introduction](https://github.com/romandmitri/introduction) repository for global overview.

The highlights include:

* Extremely simple setup/startup for local development. See [Boot](#boot) section.
* Google Cloud Platform (GCP) infrastructure provision via Terraform. See [services/reppo-infrastructure](/services/reppo-infrastructure) folder.
* CI/CD pipeline and automatic tests via GitHub Actions workflows. See [.github](/.github) folder.
* Documentation and diagrams. See [docs](/docs) folder.

### Context

Let's pretend this is a project for a company named `Cheese Industries Inc.` and the internal prefix/codename is `REPPO` which means `repo` (repository). This
prefix is unique and therefore easy to global replace.

---

## Boot (and Requirements)

> This repo was built using Ubuntu version `24.04` at time of writing, but should generally work on MacOS too.

* Make sure you have the following installed on your host machine:
    * `docker` (>= `28.3.3`)
    * `make`

### Secrets (aka ENVs)

Each service will look for own `.env*` files. See [env-secrets.md](/docs/env-secrets.md) for details.

#### Ngrok

> Typically `ngrok` is used for webhook forwarding during `local` development. This project does NOT need it yet, but it's here for completion.

Update `services/reppo-api/env.local` with `ngrok` values specific to your development machine.

https://dashboard.ngrok.com/get-started/your-authtoken
https://dashboard.ngrok.com/domains

```
REPPO_API_NGROK_AUTH_TOKEN=123abc...
REPPO_API_NGROK_DOMAIN=NAME.ngrok.io
```

### Boot

```
make local-boot
```

The project should start on `http://localhost:2400` address.

> If project does NOT start, see [local-troubleshooting.md](/docs/local-troubleshooting.md) file.

## Logs

During local development, you can watch all container logs simultaneously:

```
make local-logs
```

...or individually, by using service-specific commands, ie:

```
make reppo-api-local-logs
make reppo-dashboard-local-logs
make reppo-proxy-local-logs
```

---

## Documentation

See [/docs](/docs) for more!
