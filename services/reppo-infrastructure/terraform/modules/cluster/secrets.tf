module "secrets" {
  source = "../_/secrets"

  depends_on = [
    google_project_service.service,
  ]
}
