// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket
resource "google_storage_bucket" "bucket" {

  depends_on = [
    google_project.project,
  ]

  force_destroy               = true
  location                    = var.region
  name                        = local.storage_bucket
  storage_class               = "STANDARD"
  uniform_bucket_level_access = true

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "PUT", "POST"]
    response_header = ["*"]
  }
}
