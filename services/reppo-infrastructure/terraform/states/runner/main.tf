module "reppo-runner" {
  source = "../../modules/runner"

  billing_account_id = "01D79A-0F0A0A-7A3CAA"
  folder_id          = "215819116620"

  member_admin = "group:gcp-organization-admins@company.com"
  member_admin_roles = [
    "roles/owner",
  ]

  member_developer = "group:gcp-developers@company.com"
  member_developer_roles = [
    "roles/editor",
    "roles/oauthconfig.editor",
    "roles/secretmanager.admin",
    "roles/storage.admin",
    "roles/storage.objectAdmin",
  ]

  project_name = "reppo-runner-01"

  region = "us-east4"
}
