# Deployment Checklist

> Follow this checklist for every release.

---

## Process

> See [Specifics](#Specifics) section below for hints and examples.

**WARNING**  
Merging code into to `main` branch will trigger GitHub workflows to automatically build and deploy modified services.

### Preparations

> Do this **BEFORE** merging into `main` branch.

* [ ] Pre-deployment [Smoke Test](#smoke-test) - confirm nothing is broken **before** deployment to avoid post-deployment confusion.
* [ ] Review and follow version-specific [Release Instructions](#release-instructions)

### Trigger Deployment

Merge code into `main` branch.

* This will trigger build and deploy jobs of modified services.
* This will trigger `version` job to tag the `main` branch with the current `VERSION` value.
    * Now is a good time to tag `staging` branch with the next [version](../docs/branching-strategy.md#workflow) value.

### Post-Deployment

* [ ] Post-deployment [Smoke Test](#smoke-test)
* [ ] Notify stakeholders

--- 

## Specifics

### Release Instructions

Version-specific release notes are located in `/release/*.md` files.

* Make sure to update ENVs, as needed.

### Smoke Test

* [ ] Infrastructure
    * [ ] Ingress
    * [ ] Database
    * [ ] Logs
* [ ] Dashboard
    * [ ] Integrations
        * [ ] BigQuery
        * [ ] Firecrawl
        * [ ] Google Cloud, ie: Chat, PubSub, Storage, Sheets, SSO (via WorkOS)
        * [ ] GoHighLevel, ie: Contacts, Calendar, Webhooks
        * [ ] PostHog
        * [ ] PostMark
        * [ ] Short.io
        * [ ] Twilio, ie: Phone Numbers, SMS
        * [ ] Vercel, ie: AI Gateway
        * [ ] WorkOS
* [ ] Website
    * [ ] Agents, ie: Hero, Industries
    * [ ] Integrations
        * [ ] PostHog
        * [ ] PostMark
        * [ ] Stripe
