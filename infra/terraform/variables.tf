variable "namespace" {
  description = "Kubernetes namespace to deploy to"
  type        = string
  default     = "smart-task-manager"
}

variable "auth_image" {
  description = "Local auth service image name"
  type        = string
  default     = "auth-service:latest"
}

variable "task_image" {
  description = "Local task service image name"
  type        = string
  default     = "task-service:latest"
}

variable "board_image" {
  description = "Local board service image name"
  type        = string
  default     = "board-service:latest"
}
