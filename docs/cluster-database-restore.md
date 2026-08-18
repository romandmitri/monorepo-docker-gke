# Cluster - Database Restore

## Steps

### Backups

Go to Google Cloud console, specifically:

* Then `Cloud SQL` section.
* Then `Backups` subsection.
* Then instance, should be `sql-01` name.

Quick links:

* [dev](https://console.cloud.google.com/sql/instances/sql-01/backups?project=cheese-reppo-c-dev-01)
* [stage](https://console.cloud.google.com/sql/instances/sql-01/backups?project=cheese-reppo-c-stage-01)
* [prod](https://console.cloud.google.com/sql/instances/sql-01/backups?project=cheese-reppo-c-prod-01)

### Restore

* Find the relevant backup and click `Restore` button.
* Click the `Overwite the source instance (sql-01)` option.
    * This will ensure that instance IP address will NOT change.

> The restore will take **~25m** to complete.
