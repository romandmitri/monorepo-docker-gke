// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/secret_manager_secret
resource "google_secret_manager_secret" "secrets" {
  for_each  = toset(var.secrets)
  secret_id = each.value

  labels = {
    service = var.service
  }

  replication {
    auto {}
  }
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/secret_manager_secret_version
resource "google_secret_manager_secret_version" "initial" {
  for_each    = toset(var.secrets)
  secret      = google_secret_manager_secret.secrets[each.value].id
  secret_data = "initial"
}
