output "cluster_name" {
  value = google_container_cluster.auto_cluster.name
}

output "cluster_endpoint" {
  value = google_container_cluster.auto_cluster.endpoint
}

output "cluster_ca_certificate" {
  value = base64decode(google_container_cluster.auto_cluster.master_auth.0.cluster_ca_certificate)
}
