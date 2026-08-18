// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database_instance
resource "google_sql_database_instance" "database" {
  name = "sql-01"
  # TODO: reidenzon - Create a NEW instance if upgrading! Then delete the old one...
  database_version = "POSTGRES_17"
  # TODO: reidenzon - Set to FALSE to destroy.
  deletion_protection = true
  depends_on = [
    google_project.project,
    google_service_account.project,
    google_service_networking_connection.sql,
  ]
  region = var.region

  settings {

    availability_type = var.sql_availability

    backup_configuration {
      enabled                        = true
      location                       = var.region
      point_in_time_recovery_enabled = true
      start_time                     = "07:00" // in var.region timezone!
    }

    # TODO: reidenzon - Why not persistent across [terraform apply] runs?!
    # connection_pool_config {
    #   connection_pooling_enabled = var.sql_edition == "ENTERPRISE_PLUS"
    #   flags {
    #     name  = "max_client_connections"
    #     value = "1024"
    #   }
    # }

    database_flags {
      // https://cloud.google.com/sql/docs/postgres/authentication
      name  = "cloudsql.iam_authentication"
      value = "on"
    }

    # TODO: reidenzon - Enable disk_autoresize feature?!
    disk_autoresize = false
    disk_size       = var.sql_disk_size
    disk_type       = "PD_SSD"

    edition = var.sql_edition

    insights_config {
      // TODO: reidenzon - Disable this for performance boost?!
      query_insights_enabled = true
      query_string_length    = 1024
    }

    ip_configuration {
      // TODO: reidenzon - This gives database public IP access!
      ipv4_enabled = true

      // https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database_instance#private-ip-instance
      private_network = google_compute_network.vpc.id
    }

    // https://cloud.google.com/sql/docs/mysql/admin-api/rest/v1beta4/tiers
    // https://cloud.google.com/compute/docs/instances/creating-instance-with-custom-machine-type#create
    tier = var.sql_tier
  }
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_user
resource "google_sql_user" "root" {
  instance = google_sql_database_instance.database.name
  name     = "postgres"
  password = "initial"
}

# TODO: reidenzon - Make this happen if viewing from GCP Console is desired... or user internal viewer role! (see below)
# TODO: reidenzon - Need SQL migration to grant view access.
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_user
# resource "google_sql_user" "iam_viewer" {
#   instance = google_sql_database_instance.database.name
#   name     = "iam_viewer"
#   type     = "CLOUD_IAM_GROUP"
# }

# TODO: reidenzon - Need SQL migration to grant view access.
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_user
resource "google_sql_user" "viewer" {
  instance = google_sql_database_instance.database.name
  name     = "viewer"
  password = "initial"
}
