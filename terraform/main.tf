# resource "google_container_cluster" "primary" {
#   name     = "mern-cluster"
#   location = var.region

#   remove_default_node_pool = true // This line ensures no default node pool is created
#   # initial_node_count = 1

#   node_pool {
#     name       = "default-pool"
#     node_count = 1

#     node_config {
#       disk_size_gb = 50
#       disk_type    = "pd-standard"  // Standard persistent disk with potentially higher quota availability
#       preemptible = false
#       machine_type = "e2-medium"
#     }

#   }
# }

resource "google_container_cluster" "auto_cluster" {
  name     = var.cluster_name
  location = var.location
  initial_node_count = 1

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }

  # Autoscaling settings, adjust according to needs
  autoscaling {
    min_node_count = 1
    max_node_count = 3
  }

  # Enable network policy, if required
  network_policy {
    enabled = true
  }
}

