terraform {
  // See TERRAFORM_VERSION in Dockerfile.local
  required_version = "1.13.1"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "7.1.1"
    }
  }
}
