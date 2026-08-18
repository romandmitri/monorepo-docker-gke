// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket
resource "google_storage_bucket" "private" {

  depends_on = [google_project.project]

  force_destroy               = true
  location                    = var.region
  name                        = local.storage_bucket_private
  storage_class               = "STANDARD"
  uniform_bucket_level_access = true
}

// NOTE: This permission is given to SQL Service Accounts from other projects to read/write SQL backups to this bucket.
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket_iam#google_storage_bucket_iam_member
resource "google_storage_bucket_iam_member" "private" {
  depends_on = [google_storage_bucket.private]

  bucket = google_storage_bucket.private.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${each.key}"

  for_each = toset(var.member_storage)
}


// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket
resource "google_storage_bucket" "public" {

  depends_on = [google_project.project]

  force_destroy               = true
  location                    = var.region
  name                        = local.storage_bucket_public
  storage_class               = "STANDARD"
  uniform_bucket_level_access = true
}

// https://cloud.google.com/storage/docs/uniform-bucket-level-access
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket_iam#google_storage_bucket_iam_member
resource "google_storage_bucket_iam_member" "public" {

  depends_on = [google_storage_bucket.public]

  bucket = google_storage_bucket.public.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}
