// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_project
resource "google_project" "project" {
  auto_create_network = false
  billing_account     = var.billing_account_id
  folder_id           = var.folder_id
  labels              = {}
  name                = var.project_name
  project_id          = local.project_id
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_project_service
resource "google_project_service" "service" {

  depends_on = [
    google_project.project,
  ]

  for_each = toset([
    "artifactregistry.googleapis.com",
    "iam.googleapis.com",
    "serviceusage.googleapis.com",
  ])

  service = each.key
}
