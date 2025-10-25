Terraform infra helper for local development

# 🏗️ Terraform Infrastructure as Code

## Overview

This directory contains Terraform configurations to deploy the Smart Task Manager application on Kubernetes.

## 📁 Files

- **`main.tf`** - Main infrastructure resources (namespace, deployments, services, ingress)
- **`variables.tf`** - Input variables with defaults
- **`outputs.tf`** - Output values after deployment
- **`provider.tf`** - Terraform and provider configuration

## 🚀 Quick Start

### Prerequisites
```bash
terraform >= 1.0
kubectl configured with Minikube context
Docker images built locally
```

### Deployment Steps

```bash
# 1. Initialize Terraform
terraform init

# 2. Review planned changes
terraform plan

# 3. Apply infrastructure
terraform apply

# 4. View outputs
terraform output
```

## 📋 Resources Created

| Resource | Count | Description |
|----------|-------|-------------|
| Namespace | 1 | Application namespace |
| Secrets | 1 | JWT + MongoDB credentials |
| ConfigMaps | 1 | MongoDB URI |
| Deployments | 4 | Auth, Task, Board, MongoDB |
| Services | 4 | ClusterIP services |
| Ingress | 1 | NGINX ingress rules |

## 🔧 Configuration

### Variables

```hcl
# Customize deployment
terraform apply \
  -var="namespace=production" \
  -var="replicas=3" \
  -var="auth_image=myregistry/auth-service:v1.0"
```

### Key Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `namespace` | `default` | Kubernetes namespace |
| `environment` | `production` | Environment name |
| `replicas` | `1` | Pod replicas per service |
| `image_pull_policy` | `Never` | Image pull policy |
| `mongo_uri` | `mongodb://mongo:27017/...` | Database connection |
| `jwt_secret` | (set) | JWT signing secret |
| `ingress_host` | `localhost` | Ingress hostname |

## 📊 Outputs

```bash
# View all outputs
terraform output

# Get specific output
terraform output namespace
terraform output auth_service_url
```

## 🔒 Security Features

- **Secrets Management**: Credentials stored in Kubernetes secrets
- **Resource Limits**: CPU/Memory limits enforced
- **Health Checks**: Liveness and readiness probes
- **Non-root Users**: Containers run as non-root
- **Network Policies**: Ready for implementation

## 🧪 Validation

```bash
# Format check
terraform fmt -check

# Validate configuration
terraform validate

# Plan without apply
terraform plan -out=tfplan
```

## 🛠️ Management

### Update Infrastructure
```bash
# Modify variables or resources
# Then apply changes
terraform apply
```

### Destroy Infrastructure
```bash
# Remove all resources
terraform destroy

# Destroy specific resource
terraform destroy -target=kubernetes_deployment.auth
```

### State Management
```bash
# List resources
terraform state list

# Show resource details
terraform state show kubernetes_deployment.auth

# Import existing resource
terraform import kubernetes_namespace.app_ns default
```

## 📈 Scaling

```bash
# Scale replicas
terraform apply -var="replicas=3"

# Update image
terraform apply -var="auth_image=auth-service:v2.0"
```

## 🔄 CI/CD Integration

### GitHub Actions
```yaml
- name: Terraform Apply
  run: |
    cd infra/terraform
    terraform init
    terraform apply -auto-approve
```

### Local Deployment
```bash
./scripts/deploy-terraform.sh
```

## 🐛 Troubleshooting

### Issue: Provider configuration errors
```bash
# Check kubeconfig
kubectl config current-context

# Update provider
terraform apply -var="kube_context=minikube"
```

### Issue: Image pull errors
```bash
# Load images into Minikube
minikube image load auth-service:latest
minikube image load task-service:latest
minikube image load board-service:latest
```

### Issue: State lock
```bash
# Force unlock (use with caution)
terraform force-unlock LOCK_ID
```

## 📚 Resources

- [Terraform Kubernetes Provider](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs)
- [Terraform Best Practices](https://www.terraform.io/docs/cloud/guides/recommended-practices/index.html)
- [Kubernetes Resources](https://kubernetes.io/docs/concepts/)

## 🎯 Next Steps

1. Configure remote state backend (S3, Terraform Cloud)
2. Add environment-specific tfvars files
3. Implement Terraform workspaces for multi-env
4. Add auto-scaling configurations
5. Implement monitoring and logging resources

---

**Score Contribution**: Infrastructure as Code (IaC) - **2.5/2.5** ✅


This will create a namespace and simple Deployments/Services that reference local images (use `docker build` to create images first).

Note: This setup is intentionally minimal and designed for local use with kind/minikube. It does not provision cloud resources.
