# reppo-api

This is the core API service for `reppo` monorepo.

This service runs on `/api` route and rebuilds automatically.

---

## Commands

```
make reppo-api-local-secrets
make reppo-api-local-restart
```

---

## Development

### Install

To install `node` packages:

* Update `package.json` file.
* Run `make reppo-api-local-install` command.

---

## Modes

This service can run in `api` and `cli` mode.

### API

The `api` mode is ran automatically inside container.

### CLI

To execute cli mode, use these examples in `local` environment:

```
make reppo-api-local-bash
pnpm local-cli [command] [options]
pnpm local-cli help
pnpm local-cli group-import --tab=TAB
pnpm local-cli user-import --tab=TAB
```

OR, for `cluster-*` environment:

```
make reppo-api-cluster-stage-bash
npm run server-cli -- [command] [options]
npm run server-cli -- help
npm run server-cli -- group-import --tab=TAB
npm run server-cli -- user-import --tab=TAB
```

---

## Testing

```
make reppo-api-local-test-watch
make reppo-api-local-test-watch pattern=/src/src/**/*.test.ts
make reppo-api-local-test-watch pattern=**/session-notifier/**/*.test.ts
make reppo-api-local-test-watch pattern=**/simulation/**/soft-chat/**/*.test.ts
make reppo-api-local-test-watch pattern=**/time-window/test/period-checker/*.test.ts
make reppo-api-local-test-watch pattern=**/time-window/test/rule-checker/*.test.ts
make reppo-api-local-test-watch pattern=**/time-window/test/rule-generator/*.test.ts
```
