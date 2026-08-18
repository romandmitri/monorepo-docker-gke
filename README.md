# `monorepo-docker-gke`

## Version `0.0.0`

--- 

## Preface

Hi, my name is **Roman Eidenzon** (aka **Roman Dmitri**). This repository showcases my capabilities as an experienced **Architect, Full Stack Developer, and
Infrastructure Specialist**.

It demonstrates a production grade microservice monorepo built for **frictionless developer onboarding**, **local to cloud parity**, **modular Infrastructure as
Code (IaC)**, and **automated GitOps pipelines**.

Instead of heavy monorepo frameworks, orchestration is handled by **Makefile** targets and modular **Bash** scripts, delivering a fast, lightweight developer
experience across Linux and macOS.

See my [introduction](https://github.com/romandmitri/introduction) repository for career overview.

### Highlights

* **Developer Experience**: Run `make local-boot` for automated container builds, secret loading, migrations, and mock data seeding. See [Boot](#boot).
* **Local Ingress**: Nginx proxy ([services/reppo-proxy](/services/reppo-proxy)) serves all microservices via `http://localhost:2000`, matching GKE Ingress and
  eliminating CORS issues.
* **GCP Infrastructure via Terraform**: Multi project setup covering GKE, Cloud SQL, Secret Manager, BigQuery, and Cloud Storage.
  See [services/reppo-infrastructure](/services/reppo-infrastructure).
* **Containerized Tooling**: Prebuilt container with Terraform, `gcloud`, and `kubectl` ensures reproducible environment management.
* **Full Stack Architecture**:
    * **Core API** ([services/reppo-api](/services/reppo-api)): Fastify and TypeScript with dual HTTP and CLI execution, request tracing, and AI or third party
      adapters.
    * **Dashboard** ([services/reppo-dashboard](/services/reppo-dashboard)): React and Vite with Shadcn UI and type safe form validation.
    * **Website** ([services/reppo-website](/services/reppo-website)): Next.js with App Router and Tailwind CSS.
    * **Migrations** ([services/reppo-migrate](/services/reppo-migrate)): PostgreSQL schema management using Kysely.
* **CI/CD Pipelines**: Path filtered GitHub Actions workflows for tests, Artifact Registry image builds, and automated Kubernetes secret injection.
  See [.github](/.github).
* **Architecture Docs**: Visual diagrams
  for [Local Topology](/docs/diagrams/deployment-local.mermaid), [GKE Cluster](/docs/diagrams/deployment-cluster.mermaid),
  and [Async Flows](/docs/diagrams/flow-socket-queue.mermaid). See [docs](/docs).

### Videos

Checkout the [Monorepo](https://www.youtube.com/playlist?list=PL7OhwvHtVH5J3-Pc0NV8vuOwBr_Q09vpp) playlist on my YouTube
channel [@cheese-code](http://youtube.com/@cheese-code) if you prefer a more-visual experience.

* Skip the jokes and jump ahead to the [Discussion](https://youtu.be/1dLHlG8yOrc?t=70&si=P8ovmiFDCPDDwCW5) chapter which covers the folder structure.

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

The project should start on `http://localhost:2000` address.

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
