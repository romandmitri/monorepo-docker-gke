// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/bigquery_dataset
resource "google_bigquery_dataset" "dataset" {
  dataset_id = "dataset"
  location   = var.region
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/bigquery_table
resource "google_bigquery_table" "audits" {
  dataset_id = google_bigquery_dataset.dataset.dataset_id
  table_id   = "audits"

  deletion_protection = true

  # TODO: reidenzon - Enable when the costs increase...
  require_partition_filter = false

  time_partitioning {
    type = "MONTH"
  }

  # TODO: reidenzon - Do manage schema via terraform.
  #  it is NOT stable to changes! Instead, create manually. :(
  #  See [BigQuery_Audit] for schema.
}
