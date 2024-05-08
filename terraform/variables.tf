variable "project_id" {
  description = "The ID of the project in which the resources will be deployed."
}

variable "location" {
  description = "The location (region) where the resources will be deployed."
}

variable "cluster_name" {
  description = "The name of the GKE cluster."
}

variable "gcloud_creds_file" {
  description = "Path to the Google Cloud credentials file."
}
