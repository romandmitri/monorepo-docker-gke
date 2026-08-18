# reppo-database

This is the primary database for **local** development.

## Connect

```
make reppo-database-local-connect
make reppo-database-cluster-stage-connect
make reppo-database-cluster-prod-connect
```

## Dump (Server)

To dump from a **cluster** to `reppo-common` storage bucket:

```
make reppo-database-cluster-dev-dump
make reppo-database-cluster-stage-dump
make reppo-database-cluster-prod-dump
```

> REMINDER
> This does NOT lock up the database while it runs.

## Dump (Local)

```
make reppo-database-local-dump file=FILENAME.sql
```

## Restore (Local)

Copy SQL backup file to `services/reppo-database/tmp/FILENAME.sql` and run:

```
make reppo-database-local-restore file=FILENAME.sql
make reppo-migrate-local-migrate
```

> There WILL be errors related to `cloudsqladmin` and `cloudsqlsuperuser` but they can be ignored.
