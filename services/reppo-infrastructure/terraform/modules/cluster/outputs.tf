output "bigquery" {
  value = module.bigquery
}

output "folder_id" {
  value = var.folder_id
}

output "kubernetes_cluster_name" {
  value = google_container_cluster.cluster.name
}

output "kubernetes_config_ip" {
  value = google_container_cluster.cluster.private_cluster_config[0].public_endpoint
}

output "kubernetes_global_ip" {
  value = google_compute_global_address.kubernetes.address
}

output "kubernetes_service_account" {
  value = data.google_compute_default_service_account.cluster.email
}

output "project_id" {
  value = google_project.project.project_id
}

output "region" {
  value = var.region
}

output "service_account_email" {
  value = google_service_account.project.email
}

output "sql_private_ip" {
  value = google_sql_database_instance.database.private_ip_address
}

output "sql_public_ip" {
  value = google_sql_database_instance.database.public_ip_address
}

output "sql_service_account" {
  value = google_sql_database_instance.database.service_account_email_address
}

output "storage_bucket" {
  value = google_storage_bucket.bucket.id
}
