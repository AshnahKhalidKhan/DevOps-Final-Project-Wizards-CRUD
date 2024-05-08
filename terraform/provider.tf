# terraform {
#   required_providers {
#     google = {
#       source  = "hashicorp/google"
#       version = "~> 3.5"
#     }
#     kubernetes = {
#       source  = "hashicorp/kubernetes"
#       version = "~> 1.13"
#     }
#   }
# }

# # provider "google" {
# #   # I ran this on CMD: set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\namra\Desktop\Main\DevOps\DevOps-Final-Project-Wizards-CRUD\devops-project-wizard-crud-f90bbc4d3e62.json
# #   # credentials = file("devops-project-wizard-crud-f90bbc4d3e62.json")
# #   project = "devops-project-wizard-crud"
# #   # region  = "us-central1"  # Replace with your actual region
# # }

# provider "google" {
#   credentials = file("C:\\Users\\namra\\Desktop\\Main\\DevOps\\DevOps-Final-Project-Wizards-CRUD\\devops-project-wizard-crud-f90bbc4d3e62.json")
#   project     = "devops-project-wizard-crud"
#   region      = "us-central1"  # Ensure this is uncommented and set
# }

# provider "kubernetes" {
#   config_path = "~/.kube/config"
# }


provider "google" {
  credentials = file("${var.gcloud_creds_file}")
  project     = var.project_id
  region      = var.location
}
