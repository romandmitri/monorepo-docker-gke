terraform {
  // https://developer.hashicorp.com/terraform/language/backend/gcs
  backend "gcs" {
    bucket = "cheese-reppo-terraform"
    prefix = "runner"

    impersonate_service_account = "terraform@reppo-terraform.iam.gserviceaccount.com"
  }
}
