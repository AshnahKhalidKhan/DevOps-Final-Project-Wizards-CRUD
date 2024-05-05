resource "google_container_cluster" "primary" {
  name     = "mern-cluster"
  location = var.region

  remove_default_node_pool = true // This line ensures no default node pool is created
  # initial_node_count = 1

  node_pool {
    name       = "default-pool"
    node_count = 1

    node_config {
      disk_size_gb = 50
      disk_type    = "pd-standard"  // Standard persistent disk with potentially higher quota availability
      preemptible = false
      machine_type = "e2-medium"
    }

  }
}
