module "bigquery" {
  source = "../_/bigquery"
  region = var.region

  depends_on = [
    google_project_service.service,
  ]
}
