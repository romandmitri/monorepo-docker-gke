output "bigquery" {
  value = module.bigquery
}

output "folder_id" {
  value = var.folder_id
}

output "project_id" {
  value = google_project.project.project_id
}

# TODO: reidenzon - Need this... or too much?!
# output "secrets" {
#   value = module.secrets
# }

output "service_account_email" {
  value = google_service_account.project.email
}
