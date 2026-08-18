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
    "projects/cheese-reppo-c-stage-01/notificationChannels/13390318614789279597", # Google Cloud Mobile App - Filip Nikacevic
    "projects/cheese-reppo-c-stage-01/notificationChannels/16794027177308600517", # Google Cloud Mobile App - Roman Eidenzon
    "projects/cheese-reppo-c-stage-01/notificationChannels/3583021051636221738"   # Google Chat
  ]

  project_name = "reppo-c-stage-01"

  region = "us-east4"

  sql_availability = "ZONAL"
  sql_disk_size    = 10
  sql_edition      = "ENTERPRISE"
  sql_tier         = "db-f1-micro"
  sql_viewer       = "gcp-developers@company.com"
}
