# Troubleshooting

## Check running containers.

Run `make local-docker-ps` to check running containers.

## The `reppo-proxy` container does not start due to missing `reppo_proxy_ip` variable.

Check `make reppo-proxy-local-logs` for errors.

If `reppo_proxy_ip` variable is missing, it's likely the secrets file is NOT setup yet. To fix, add the following lines
to [.env.local](services/reppo-proxy/.env.local) and run `make local-boot` again...

> You do NOT need to specify values here, they will be determined automatically by the boot script.

```
REPPO_PROXY_IP=
```

## Missing `network` during `make local-boot` scripts.

You can **obliterate** docker volumes, images, networks, etc... via command:

```
make local-prune
```

## Missing `ENV` files.

Most services should have a `.env` file with default values during `make local-boot` command.

Manually pull latest secrets using command:

```
make local-secrets
```
