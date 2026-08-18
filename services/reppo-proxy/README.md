# reppo-proxy

This is the gateway into the rest of `reppo` services.

## Deployment

### Local

Local deployments (via Docker) use `nginx` as the proxy.

### Cluster

Cluster deployments rely on Ingress (Kubernetes) resource to create Load Balancer in relevant GCP (Google Cloud Platform) project.
