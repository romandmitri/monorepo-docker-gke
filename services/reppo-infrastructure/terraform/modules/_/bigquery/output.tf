output "dataset_id" {
  value = google_bigquery_dataset.dataset.id
}

output "table_audits_id" {
  value = google_bigquery_table.audits.id
}
