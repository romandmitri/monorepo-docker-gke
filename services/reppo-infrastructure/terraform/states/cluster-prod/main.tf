module "reppo-cluster" {
  source = "../../modules/cluster"

  billing_account_id = "01D79A-0F0A0A-7A3CAA"
  folder_id          = "215819116620"

  member_admin = "group:gcp-organization-admins@company.com"
  member_admin_roles = [
    "roles/owner",
    "roles/editor",
    "roles/cloudsql.instanceUser",
    "roles/container.developer",
    "roles/logging.privateLogViewer",
    "roles/monitoring.viewer",
    "roles/oauthconfig.editor",
    "roles/secretmanager.admin",
    "roles/storage.admin",
  ]

  member_developer       = "group:gcp-developers@company.com"
  member_developer_roles = []

  notification_channels = [
    "projects/cheese-reppo-c-prod-01/notificationChannels/8552580390134560414",  # Google Cloud Mobile App - Filip Nikacevic
    "projects/cheese-reppo-c-prod-01/notificationChannels/11105974223841893099", # Google Cloud Mobile App - Roman Eidenzon
    "projects/cheese-reppo-c-prod-01/notificationChannels/7993467445143124016"   # Google Chat - "Alerts - Production"
  ]

  project_name = "reppo-c-prod-01"

  region = "us-east4"

  sql_availability = "REGIONAL"
  sql_disk_size    = 10
  sql_edition      = "ENTERPRISE_PLUS"
  sql_tier         = "db-perf-optimized-N-2"
  # TODO: reidenzon - Consider dedicated group and/or remove Tobi from this one!
  sql_viewer = "gcp-organization-admins@company.com"
}
