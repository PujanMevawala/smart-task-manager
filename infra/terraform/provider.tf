// Provider configuration for Terraform: Kubernetes + local exec for kind
terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
    null = {
      source = "hashicorp/null"
    }
  }
}

provider "kubernetes" {
  # kubeconfig will be picked from KUBECONFIG env or default location
}
