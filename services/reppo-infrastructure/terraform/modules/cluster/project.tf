// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_project
resource "google_project" "project" {
  auto_create_network = true
  billing_account     = var.billing_account_id
  folder_id           = var.folder_id
  name                = var.project_name
  project_id          = local.project_id
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_project_service
resource "google_project_service" "service" {

  depends_on = [
    google_project.project,
  ]

  for_each = toset([
    "iam.googleapis.com",
    "aiplatform.googleapis.com",
    "bigquery.googleapis.com",
    "chat.googleapis.com",
    "compute.googleapis.com",
    "container.googleapis.com",
    "logging.googleapis.com",
    "networkmanagement.googleapis.com",
    "pubsub.googleapis.com",
    "secretmanager.googleapis.com",
    "serviceusage.googleapis.com",
    "servicenetworking.googleapis.com",
    "sheets.googleapis.com",
    "sqladmin.googleapis.com",
  ])

  service = each.key
}
