// https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address#reserve_new_static
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_global_address
resource "google_compute_global_address" "kubernetes" {
  address_type = "EXTERNAL"
  depends_on = [
    google_project.project,
    google_project_service.service,
  ]
  ip_version = "IPV4"
  name       = "kubernetes-global-ip"
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_global_address
resource "google_compute_global_address" "sql" {
  depends_on = [
    google_project.project,
    google_project_service.service,
  ]
  address_type  = "INTERNAL"
  name          = "sql-ip"
  network       = google_compute_network.vpc.id
  purpose       = "VPC_PEERING"
  prefix_length = 16
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_network
resource "google_compute_network" "vpc" {
  depends_on = [
    google_project.project,
    google_project_service.service,
  ]
  name                    = "network"
  auto_create_subnetworks = false
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_router
resource "google_compute_router" "router" {
  depends_on = [
    google_project.project,
    google_project_service.service,
  ]
  name    = "router"
  network = google_compute_network.vpc.name
  region  = google_compute_subnetwork.subnet.region
  bgp {
    asn = 64514
  }
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_router_nat
resource "google_compute_router_nat" "nat" {
  depends_on = [
    google_project.project,
    google_project_service.service,
  ]
  nat_ip_allocate_option             = "AUTO_ONLY"
  name                               = "nat"
  region                             = google_compute_router.router.region
  router                             = google_compute_router.router.name
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_subnetwork
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_network_peering_routes_config
resource "google_compute_subnetwork" "subnet" {
  depends_on = [
    google_project.project,
    google_project_service.service,
  ]
  ip_cidr_range            = "10.0.36.0/24"
  name                     = "${google_compute_network.vpc.name}-subnet"
  network                  = google_compute_network.vpc.name
  region                   = var.region
  private_ip_google_access = true

  secondary_ip_range {
    range_name    = "pod"
    ip_cidr_range = "10.0.0.0/19"
  }

  secondary_ip_range {
    range_name    = "svc"
    ip_cidr_range = "10.0.32.0/22"
  }
}

// TODO: reidenzon - Remove if NOT needed.
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/service_networking_connection
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database_instance#private-ip-instance
resource "google_service_networking_connection" "sql" {
  depends_on = [
    google_project.project,
    google_project_service.service,
  ]
  network = google_compute_network.vpc.id
  service = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [
    google_compute_global_address.sql.name
  ]
}
