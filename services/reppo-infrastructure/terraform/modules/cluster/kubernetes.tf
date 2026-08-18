# TODO: reidenzon - Use this module instead?!
// https://github.com/terraform-google-modules/terraform-google-kubernetes-engine

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/container_cluster
resource "google_container_cluster" "cluster" {

  depends_on = [
    google_project_service.service,
  ]

  name     = "cluster"
  location = var.region

  enable_autopilot = true

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name

  ip_allocation_policy {
    cluster_secondary_range_name  = google_compute_subnetwork.subnet.secondary_ip_range[0].range_name
    services_secondary_range_name = google_compute_subnetwork.subnet.secondary_ip_range[1].range_name
  }

  private_cluster_config {
    enable_private_endpoint = false
    enable_private_nodes    = true
    master_ipv4_cidr_block  = "10.42.0.0/28"
  }

  master_auth {
    client_certificate_config {
      issue_client_certificate = false
    }
  }

  maintenance_policy {
    recurring_window {
      start_time = "2026-01-01T06:00:00Z"
      end_time   = "2026-01-01T10:00:00Z"
      recurrence = "FREQ=WEEKLY;BYDAY=MO,TU,WE"
    }
  }

  vertical_pod_autoscaling {
    enabled = true
  }
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/compute_default_service_account
data "google_compute_default_service_account" "cluster" {
  depends_on = [
    google_container_cluster.cluster
  ]
}
