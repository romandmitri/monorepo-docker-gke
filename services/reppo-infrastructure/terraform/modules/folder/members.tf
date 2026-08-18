// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_folder_iam
resource "google_folder_iam_member" "terraform" {
  folder = var.folder_id
  member = var.service_account
  role   = each.key

  for_each = toset([
    "roles/owner",
    "roles/editor",
    "roles/artifactregistry.admin",
    "roles/iam.serviceAccountTokenCreator",
    # "roles/firebase.admin",
    "roles/resourcemanager.folderAdmin",
    "roles/resourcemanager.projectCreator",
  ])
}

# TODO: reidenzon - Grant view access to admin/developer members?!
