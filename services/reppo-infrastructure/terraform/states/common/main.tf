module "reppo-common" {
  source = "../../modules/common"

  billing_account_id = "01D79A-0F0A0A-7A3CAA"
  folder_id          = "215819116620"

  // See "kubernetes_service_account" output from clusters.
  member_artifacts = [
    // TODO: reidenzon - Extend this list as new clusters are added!
    "serviceAccount:300354798032-compute@developer.gserviceaccount.com", // dev
    "serviceAccount:834012959862-compute@developer.gserviceaccount.com", // stage
    "serviceAccount:762623656555-compute@developer.gserviceaccount.com"  // prod
  ]

  member_admin = "group:gcp-organization-admins@company.com"
  member_admin_roles = [
    "roles/owner",
  ]

  member_developer = "group:gcp-developers@company.com"
  member_developer_roles = [
    // "roles/editor",
    "roles/container.developer",
    "roles/secretmanager.admin",
    "roles/storage.admin",
    "roles/storage.objectAdmin",
  ]

  // See "sql_service_account" output from clusters.
  member_storage = [
    // TODO: reidenzon - Extend this list as new clusters are added!
    "p300354798032-sfb4s3@gcp-sa-cloud-sql.iam.gserviceaccount.com", // dev (sql)
    "p834012959862-hz8t0o@gcp-sa-cloud-sql.iam.gserviceaccount.com", // stage (sql)
    "p762623656555-y86332@gcp-sa-cloud-sql.iam.gserviceaccount.com", // prod (sql)
  ]

  project_name = "reppo-common-01"

  region = "us-east4"

  service_account = "serviceAccount:terraform@reppo-terraform.iam.gserviceaccount.com"
}
