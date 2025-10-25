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

````bash
docker build -t auth-service:latest ./auth-service
docker build -t task-service:latest ./task-service
# Smart Task Manager — Runbook & Summary

This repository contains a simple microservices task manager (three Node.js services) plus Kubernetes manifests, a Terraform skeleton, and a CI/CD workflow. This README explains what changed, how to run everything locally (Docker Compose) and on a local Kubernetes cluster (minikube), and how secrets are handled.

## What changed (recent work)
- Converted Dockerfiles to multi-stage builds for smaller production images.
- Kubernetes Services use `ClusterIP` for internal DNS-based service-to-service communication; a single Ingress is the public entry point.
- Added a Terraform skeleton (`infra/terraform/`) to manage namespace/deployments/services locally.
- Added GitHub Actions CI with a Trivy scan step for security checks.
- Normalized `.dockerignore` and `.gitignore`. Tracked `.env` files were removed and `*.env.example` files were added for each service.

## Short repo layout
- `auth-service/`, `task-service/`, `board-service/` — Node.js services
- `k8s/` — Kubernetes manifests (deployments, services, ingress, mongo)
- `infra/terraform/` — Terraform skeleton
- `.github/workflows/ci-cd.yml` — CI pipeline (build/test/scan)

## Secrets and `.env` files (IMPORTANT)
- Local `.env` files are not tracked. Copy `*.env.example` to `*.env` and set secure values locally. Do not commit `.env`.
- Prefer creating Kubernetes secrets at deploy time from local `.env` files. Example:

```bash
# create/update k8s secret from auth-service .env (local)
kubectl create secret generic smart-secrets --from-env-file=auth-service/.env --dry-run=client -o yaml | kubectl apply -f -
````

If a secret was pushed to a remote previously, rotate it immediately. I can prepare a safe history-purge plan if needed.

---

## Quick run — Docker Compose (fast local dev)

1. Copy examples locally (do not commit these files):

```bash
cp auth-service/.env.example auth-service/.env
cp task-service/.env.example task-service/.env
cp board-service/.env.example board-service/.env
# Edit each .env to replace JWT_SECRET with a secure value
```

2. Start the stack:

```bash
docker compose up --build
```

3. Services:

- Auth: http://localhost:8000
- Task: http://localhost:8001
- Board: http://localhost:8002

4. Stop:

```bash
docker compose down
```

---

## Run on Kubernetes (minikube)

1. Start minikube and enable ingress:

```bash
minikube start
minikube addons enable ingress
```

2. Build images and load into minikube (no registry required):

```bash
docker build -t auth-service:latest ./auth-service
docker build -t task-service:latest ./task-service
docker build -t board-service:latest ./board-service

minikube image load auth-service:latest
minikube image load task-service:latest
minikube image load board-service:latest
```

3. Create Mongo config and secrets (preferred: from local `.env`):

```bash
kubectl apply -f k8s/mongo-config.yaml
kubectl create secret generic smart-secrets --from-env-file=auth-service/.env --dry-run=client -o yaml | kubectl apply -f -
```

4. Deploy manifests:

```bash
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

5. Verify:

```bash
kubectl get pods -A
kubectl get svc -n default
kubectl get ingress
```

Tip: `minikube service <svc> --url` gives a quick service URL for debugging.

---

## CI/CD and image registry

- The workflow builds and scans images but doesn't push them to a registry by default. To enable CI-driven deploys you should:
  1. Create a registry (GHCR/Docker Hub/ECR) and a service account or token.
  2. Add registry credentials as GitHub Secrets.
  3. Update `.github/workflows/ci-cd.yml` to login and push images.
  4. Update Terraform/K8s to reference `registry/image:tag` instead of local `auth-service:latest`.

---

## Security & production notes

- Do not store secrets as plain files in git. Use secret managers (Vault, cloud KMS) and generate k8s secrets at deploy time.
- Add readiness/liveness probes, resource requests/limits, and PDBs before production.
- Add image and dependency scanning in CI (Trivy + npm audit/Snyk).

## Files changed recently (high level)

- Multi-stage Dockerfiles for services
- Per-service `.dockerignore` files
- `k8s/` manifests updated to use `ClusterIP` services, with an `ingress.yaml` for external routing
- `infra/terraform/` skeleton added
- `.github/workflows/ci-cd.yml` added (includes Trivy scan)
- `.env.example` files added; tracked `.env` files removed

## Next optional tasks I can do for you

- Replace `k8s/secrets.yaml` with `k8s/secrets.yaml.template` and commit (to avoid storing base64 secrets in git).
- Add a `Makefile` or `scripts/dev-deploy.sh` that automates build/load/apply for minikube.
- Run a full git-history secret scan and prepare a purge plan if any secrets are present in history.

Prepared on: 2025-10-25
