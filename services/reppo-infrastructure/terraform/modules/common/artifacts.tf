# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/artifact_registry_repository
resource "google_artifact_registry_repository" "docker" {
  depends_on    = [google_project.project]
  format        = "DOCKER"
  location      = var.region
  repository_id = "docker"
}
