output "namespace" {
  description = "Namespace created for the app"
  value       = kubernetes_namespace.app_ns.metadata[0].name
}

output "auth_service_name" {
  value = kubernetes_service.auth.metadata[0].name
}

output "task_service_name" {
  value = kubernetes_service.task.metadata[0].name
}

output "board_service_name" {
  value = kubernetes_service.board.metadata[0].name
}
