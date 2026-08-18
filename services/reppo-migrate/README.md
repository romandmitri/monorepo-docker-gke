# reppo-migrate

This services uses `Kysely` (Node) for PostgreSQL schema migrations in `reppo-database` service.

--- 

## Basics

### Create

```
make reppo-migrate-local-create name=NAME
make reppo-migrate-local-create name=create-table-alpha
```

### Migrate

```
make reppo-migrate-local-migrate
```

### Generate

Generate TypeScript table definitions...

```
reppo-migrate-local-generate
```

---

## General

### Install

To install node packages:

* Update `package.json` file.
* Run `make reppo-migrate-local-install` command.
* Refresh IDE (via `File` -> `Reload All from Disk` on Intellij IDEA).
