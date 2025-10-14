// Main Terraform file to create namespace, deployments and ClusterIP services
provider "kubernetes" {}

resource "kubernetes_namespace" "app_ns" {
  metadata {
    name = var.namespace
  }
}

// Auth Deployment
resource "kubernetes_deployment" "auth" {
  metadata {
    name      = "auth-service"
    namespace = kubernetes_namespace.app_ns.metadata[0].name
    labels = { app = "auth-service" }
  }
  spec {
    replicas = 1
    selector { match_labels = { app = "auth-service" } }
    template {
      metadata { labels = { app = "auth-service" } }
      spec {
        container {
          name  = "auth-service"
          image = var.auth_image
          port { container_port = 8000 }
          env { name = "NODE_ENV" value = "production" }
        }
      }
    }
  }
}

resource "kubernetes_service" "auth" {
  metadata {
    name      = "auth-service"
    namespace = kubernetes_namespace.app_ns.metadata[0].name
  }
  spec {
    selector = { app = "auth-service" }
    port { port = 80 target_port = 8000 }
    type = "ClusterIP"
  }
}

// Task Deployment
resource "kubernetes_deployment" "task" {
  metadata {
    name      = "task-service"
    namespace = kubernetes_namespace.app_ns.metadata[0].name
    labels = { app = "task-service" }
  }
  spec {
    replicas = 1
    selector { match_labels = { app = "task-service" } }
    template {
      metadata { labels = { app = "task-service" } }
      spec {
        container {
          name  = "task-service"
          image = var.task_image
          port { container_port = 8001 }
          env { name = "NODE_ENV" value = "production" }
        }
      }
    }
  }
}

resource "kubernetes_service" "task" {
  metadata {
    name      = "task-service"
    namespace = kubernetes_namespace.app_ns.metadata[0].name
  }
  spec {
    selector = { app = "task-service" }
    port { port = 80 target_port = 8001 }
    type = "ClusterIP"
  }
}

// Board Deployment
resource "kubernetes_deployment" "board" {
  metadata {
    name      = "board-service"
    namespace = kubernetes_namespace.app_ns.metadata[0].name
    labels = { app = "board-service" }
  }
  spec {
    replicas = 1
    selector { match_labels = { app = "board-service" } }
    template {
      metadata { labels = { app = "board-service" } }
      spec {
        container {
          name  = "board-service"
          image = var.board_image
          port { container_port = 8002 }
          env { name = "NODE_ENV" value = "production" }
        }
      }
    }
  }
}

resource "kubernetes_service" "board" {
  metadata {
    name      = "board-service"
    namespace = kubernetes_namespace.app_ns.metadata[0].name
  }
  spec {
    selector = { app = "board-service" }
    port { port = 80 target_port = 8002 }
    type = "ClusterIP"
  }
}
