// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_service_account
resource "google_service_account" "project" {
  account_id = "project"
  depends_on = [
    google_project.project
  ]
}


// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket_iam#google_storage_bucket_iam_member
resource "google_project_iam_member" "service-account-project" {
  project = local.project_id
  member  = "serviceAccount:${google_service_account.project.email}"
  role    = each.key

  for_each = toset([
    "roles/aiplatform.user",
    "roles/bigquery.dataEditor",
    "roles/bigquery.jobUser",
    "roles/pubsub.editor",
    "roles/storage.objectAdmin",
  ])
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_project_iam#google_project_iam_member
resource "google_project_iam_member" "admin" {
  project = local.project_id
  member  = var.member_admin
  role    = each.key

  for_each = toset(concat(var.member_admin_roles, var.member_developer_roles))
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_project_iam#google_project_iam_member
resource "google_project_iam_member" "developer" {
  project = local.project_id
  member  = var.member_developer
  role    = each.key

  for_each = toset(var.member_developer_roles)
}
