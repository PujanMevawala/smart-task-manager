# Smart Task Manager

A microservices-based task management application built with Node.js, Express, MongoDB, and Kubernetes. The application consists of three main services: Authentication Service, Task Service, and Board Service.

## Project Structure

```
smart-task-manager/
├── auth-service/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   └── authController.js
│       ├── middleware/
│       │   └── authMiddleware.js
│       ├── models/
│       │   └── User.js
│       └── routes/
│           └── authRoutes.js
├── board-service/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── controllers/
│       │   └── boardController.js
│       ├── middleware/
│       │   └── authMiddleware.js
│       ├── models/
│       │   └── Board.js
│       └── routes/
│           └── boardRoutes.js
├── task-service/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   └── taskController.js
│       ├── middleware/
│       │   └── authMiddleware.js
│       ├── models/
│       │   └── Task.js
│       └── routes/
│           └── taskRoutes.js
└── k8s/
    ├── auth-deployment.yaml
    ├── auth-service.yaml
    ├── board-deployment.yaml
    ├── board-service.yaml
    ├── ingress.yaml
    ├── mongo-config.yaml
    ├── mongo-deployment.yaml
    ├── mongo-service.yaml
    ├── secrets.yaml
    ├── task-deployment.yaml
    └── task-service.yaml
```

## Prerequisites

- Docker Desktop with Kubernetes enabled
- Node.js (v14 or later)
- kubectl CLI
- Minikube
- MongoDB

## Setting Up the Environment

1. Start Minikube:

```bash
minikube start
```

2. Enable the Ingress addon:

```bash
minikube addons enable ingress
```

3. Build Docker images for each service:

```bash
# Build Auth Service
cd auth-service
docker build -t auth-service:latest .

# Build Board Service
cd ../board-service
docker build -t board-service:latest .

# Build Task Service
cd ../task-service
docker build -t task-service:latest .
```

4. Create Kubernetes Resources:

```bash
# Create MongoDB ConfigMap and Secrets
kubectl apply -f k8s/mongo-config.yaml
kubectl apply -f k8s/secrets.yaml

# Deploy MongoDB
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml

# Deploy Auth Service
kubectl apply -f k8s/auth-deployment.yaml
kubectl apply -f k8s/auth-service.yaml

# Deploy Board Service
kubectl apply -f k8s/board-deployment.yaml
kubectl apply -f k8s/board-service.yaml

# Deploy Task Service
kubectl apply -f k8s/task-deployment.yaml
kubectl apply -f k8s/task-service.yaml

# Deploy Ingress
kubectl apply -f k8s/ingress.yaml
```

5. Verify all pods are running:

```bash
kubectl get pods
```

## API Endpoints

### Auth Service (http://localhost:8000)

- **POST /api/auth/register**

  - Register a new user

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name": "Test User", "username": "testuser", "email": "test@example.com", "password": "password123"}' http://localhost:8000/api/auth/register
  ```

- **POST /api/auth/login**

  - Login with existing credentials

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "password123"}' http://localhost:8000/api/auth/login
  ```

- **GET /api/auth/me**
  - Get current user details (requires authentication)
  ```bash
  curl -H "Authorization: Bearer <your-token>" http://localhost:8000/api/auth/me
  ```

### Task Service (http://localhost:8001)

- **POST /api/tasks**

  - Create a new task

  ```bash
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your-token>" -d '{"title": "Test Task", "description": "Test Task Description", "status": "todo"}' http://localhost:8001/api/tasks
  ```

- **GET /api/tasks**
  - Get all tasks
  ```bash
  curl -H "Authorization: Bearer <your-token>" http://localhost:8001/api/tasks
  ```
 # Smart Task Manager

Production-ready, microservices-based task management application built with Node.js, Express, MongoDB and Kubernetes.

This document explains the architecture, local development flow, infrastructure-as-code (Terraform) usage, CI/CD (GitHub Actions), security scanning, and deployment recommendations.

## Table of contents
- Project overview
- Architecture
- Getting started (quick)
- Local development (Docker Compose & Minikube)
- Infrastructure as Code (Terraform)
- CI/CD (GitHub Actions)
- Security (Trivy integration)
- Production recommendations
- Troubleshooting & Monitoring
- Contributing
- License

## Project overview

This repository contains three primary microservices:

- `auth-service` — user registration, authentication and JWT issuance
- `task-service` — CRUD operations for tasks
- `board-service` — boards management

Each service is a standalone Node.js app with its own Dockerfile and manifests in `k8s/`. The repository also contains Terraform skeleton under `infra/terraform/` and a CI/CD workflow in `.github/workflows/ci-cd.yml`.

## Architecture

- Services communicate internally via Kubernetes DNS and `ClusterIP` services.
- A single Ingress acts as the public API gateway (paths routed to internal services).
- MongoDB runs as a single instance for local/dev; in production use a managed or replicated cluster.
- CI builds and scans images; Terraform manages namespace + workloads for local clusters.

Diagram (logical):

Ingress -> auth-service (ClusterIP)
        -> task-service (ClusterIP)
        -> board-service (ClusterIP)

MongoDB (Stateful) -> auth/task/board (via MONGO_URI)

## Getting started (quick)

Prerequisites
- Docker (Desktop)
- Node.js (18+)
- kubectl
- minikube or kind
- Terraform (0.13+)

Quick start (dev with Docker Compose)

1. Build and run services with Docker Compose (local dev database):

```bash
docker compose up --build
```

2. The services will be available on:
- Auth: http://localhost:8000
- Task: http://localhost:8001
- Board: http://localhost:8002

Use the provided API examples in `k8s/` or `README` for testing endpoints.

## Local Kubernetes (minikube) — recommended flow

1. Start minikube and enable ingress:

```bash
minikube start
minikube addons enable ingress
```

2. Build images locally and load into minikube:

```bash
docker build -t auth-service:latest ./auth-service
docker build -t task-service:latest ./task-service
docker build -t board-service:latest ./board-service

# Load into minikube so the cluster can use local images
minikube image load auth-service:latest
minikube image load task-service:latest
minikube image load board-service:latest
```

3. Apply Kubernetes manifests (services are ClusterIP; ingress is public):

```bash
kubectl apply -f k8s/mongo-config.yaml
kubectl apply -f k8s/secrets.yaml
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml

kubectl apply -f k8s/auth-deployment.yaml
kubectl apply -f k8s/auth-service.yaml
kubectl apply -f k8s/task-deployment.yaml
kubectl apply -f k8s/task-service.yaml
kubectl apply -f k8s/board-deployment.yaml
kubectl apply -f k8s/board-service.yaml

kubectl apply -f k8s/ingress.yaml
```

4. Verify:

```bash
kubectl get pods -A
kubectl get svc -n default
kubectl get ingress
```

Notes:
- Use `minikube service <svc> --url` for direct service URLs during local testing.

## Terraform (infra/terraform)

The repository contains a minimal Terraform configuration that creates a namespace and Deployments/Services using the Kubernetes provider. It is intended for local use (with an existing kubeconfig from minikube/kind).

How to use:

```bash
cd infra/terraform
terraform init
terraform apply
```

Important:
- Terraform expects the images referenced (defaults: `auth-service:latest`, `task-service:latest`, `board-service:latest`) to be available in the cluster (use `minikube image load` or push to a registry and change variables).
- The Terraform manifests are a skeleton — for production, convert to Helm charts or a full terraform module with secrets management.

## CI/CD (GitHub Actions)

The `.github/workflows/ci-cd.yml` file implements a pipeline that runs on pushes to `main`:

- Checks out the repo and sets up Node.js
- Installs dependencies and runs tests (per-service if `package.json` provides `test` script)
- Builds Docker images locally in the runner
- Runs Trivy filesystem scan against the repository
- Validates Kubernetes manifests using `kubectl apply --dry-run=client`

Notes and best practices:
- The pipeline currently builds images but does not push them to a registry — to deploy from CI to a cluster, add a step that authenticates and pushes images to a registry (DockerHub, GHCR) and update Terraform variables to point to those images.
- Store any secrets (registry credentials, kubeconfig) in GitHub Secrets when enabling real deployment.

## Security (DevSecOps)

- Trivy is integrated into the CI to perform quick filesystem scans on the built artifacts.
- For production, add:
  - Image scanning on built/pushed images
  - Dependency scanning (e.g., npm audit, Snyk)
  - IaC scanning (e.g., tfsec for Terraform, kube-linter for K8s manifests)

## Production recommendations

1. Replace local MongoDB with a managed or highly-available DB (MongoDB Atlas, cloud provider hosted, or a replicated StatefulSet).
2. Use a container registry (GHCR/AWS ECR/DockerHub) and make CI push versioned images.
3. Use Helm charts or a GitOps approach (ArgoCD/Flux) for environment promotion.
4. Add health/readiness probes, resource requests/limits, and PodDisruptionBudgets.
5. Configure centralized logging (ELK/EFK), metrics (Prometheus/Grafana), and tracing (OpenTelemetry).
6. Secrets: use Vault or cloud provider secret manager and avoid storing secrets as plain Kubernetes Secrets in git.

## Troubleshooting & Monitoring

- If pods aren't starting: `kubectl describe pod <pod>` and `kubectl logs <pod>`.
- If services can't reach MongoDB: verify `MONGO_URI` and `kubectl get svc` for Mongo service and ensure DNS resolves.
- Ingress not routing: ensure ingress controller is running (`kubectl get pods -n ingress-nginx`) and that host/path rules match.

## Contributing

1. Fork the repo and create a feature branch.
2. Run unit tests and linters locally.
3. Open a PR with a clear description and link to related issues.

## License

This project uses an MIT-style license (update as required).
