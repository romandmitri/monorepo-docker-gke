module "reppo-cluster" {
  source = "../../modules/cluster"

  billing_account_id = "01D79A-0F0A0A-7A3CAA"
  folder_id          = "215819116620"

  member_admin = "group:gcp-organization-admins@company.com"
  member_admin_roles = [
    "roles/owner",
  ]

  member_developer = "group:gcp-developers@company.com"
  member_developer_roles = [
    "roles/editor",
    "roles/cloudsql.instanceUser",
    "roles/container.developer",
    "roles/logging.privateLogViewer",
    "roles/monitoring.viewer",
    "roles/oauthconfig.editor",
    "roles/secretmanager.admin",
    "roles/storage.admin",
  ]

  notification_channels = [
    # "projects/cheese-reppo-c-dev-01/notificationChannels/xxx", # Google Cloud Mobile App - Filip Nikacevic
    "projects/cheese-reppo-c-dev-01/notificationChannels/2081089792975779282", # Google Cloud Mobile App - Roman Eidenzon
    "projects/cheese-reppo-c-dev-01/notificationChannels/17489063890719206852" # Google Chat
  ]

  project_name = "reppo-c-dev-01"

  region = "us-east4"

  sql_availability = "ZONAL"
  sql_disk_size    = 10
  sql_edition      = "ENTERPRISE"
  sql_tier         = "db-f1-micro"
  sql_viewer       = "gcp-developers@company.com"
}
