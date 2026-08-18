// https://developer.hashicorp.com/terraform/language/state/remote-state-data
data "terraform_remote_state" "folder" {
  backend = "gcs"
  config = {
    bucket = "cheese-reppo-terraform"
    prefix = "folder"
  }
}

// https://developer.hashicorp.com/terraform/language/state/remote-state-data
data "terraform_remote_state" "common" {
  backend = "gcs"
  config = {
    bucket = "cheese-reppo-terraform"
    prefix = "common"
  }
}

// https://developer.hashicorp.com/terraform/language/state/remote-state-data
data "terraform_remote_state" "local" {
  backend = "gcs"
  config = {
    bucket = "cheese-reppo-terraform"
    prefix = "local"
  }
}
// https://developer.hashicorp.com/terraform/language/state/remote-state-data
data "terraform_remote_state" "runner" {
  backend = "gcs"
  config = {
    bucket = "cheese-reppo-terraform"
    prefix = "runner"
  }
}

// https://developer.hashicorp.com/terraform/language/state/remote-state-data
data "terraform_remote_state" "cluster-dev" {
  backend = "gcs"
  config = {
    bucket = "cheese-reppo-terraform"
    prefix = "cluster-dev"
  }
}

// https://developer.hashicorp.com/terraform/language/state/remote-state-data
data "terraform_remote_state" "cluster-stage" {
  backend = "gcs"
  config = {
    bucket = "cheese-reppo-terraform"
    prefix = "cluster-stage"
  }
}

// https://developer.hashicorp.com/terraform/language/state/remote-state-data
data "terraform_remote_state" "cluster-prod" {
  backend = "gcs"
  config = {
    bucket = "cheese-reppo-terraform"
    prefix = "cluster-prod"
  }
}
