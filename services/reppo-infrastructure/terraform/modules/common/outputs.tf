output "artifact_registry_uri" {
  // us-east4-docker.pkg.dev/cheese-reppo-common-01/docker
  value = google_artifact_registry_repository.docker.registry_uri
}

output "folder_id" {
  value = var.folder_id
}

output "project_id" {
  value = google_project.project.project_id
}

output "service_account_email" {
  value = google_service_account.project.email
}

output "storage_bucket_private" {
  value = google_storage_bucket.private.id
}

output "storage_bucket_public" {
  value = google_storage_bucket.public.id
}
