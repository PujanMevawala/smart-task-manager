<div align="center"><div align="center">

# 🚀 Smart Task Manager# 🚀 Smart Task Manager

[![CI/CD](https://github.com/PujanMevawala/smart-task-manager/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/PujanMevawala/smart-task-manager/actions)[![CI/CD](https://github.com/PujanMevawala/smart-task-manager/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/PujanMevawala/smart-task-manager/actions)

[![Docker](https://img.shields.io/badge/Docker-Multi--stage-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)[![Docker](https://img.shields.io/badge/Docker-Multi--stage-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes&logoColor=white)](https://kubernetes.io/)[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes&logoColor=white)](https://kubernetes.io/)

[![Terraform](https://img.shields.io/badge/IaC-Terraform-7B42BC?logo=terraform&logoColor=white)](https://www.terraform.io/)[![Terraform](https://img.shields.io/badge/IaC-Terraform-7B42BC?logo=terraform&logoColor=white)](https://www.terraform.io/)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**A production-ready, full-stack task management application with modern microservices architecture, containerization, and automated DevOps pipeline.\*\***A production-ready, full-stack task management application with modern microservices architecture, containerization, and automated DevOps pipeline.\*\*

[Live Demo](https://ulrike-comfier-precontemporaneously.ngrok-free.dev) • [Documentation](#-documentation) • [Quick Start](#-quick-start)[Live Demo](https://ulrike-comfier-precontemporaneously.ngrok-free.dev) • [Documentation](#documentation) • [Quick Start](#quick-start)

</div></div>

---

## ✨ Features## ✨ Features

### 🎨 Frontend### 🎨 Frontend

- **Modern React UI** with professional blue-teal gradient theme

- **Responsive Dashboard** with real-time task and board statistics- **Modern React UI** with professional blue-teal gradient theme

- **Kanban Board** with intuitive task management across three states- **Responsive Dashboard** with real-time task and board statistics

- **Board Management** with member collaboration features- **Kanban Board** with drag-and-drop task management

- **JWT Authentication** with secure login/register flows- **Board Management** with member collaboration

- **Professional Design** with glassmorphism effects and smooth animations- **JWT Authentication** with secure login/register

- **Professional Design** with glassmorphism effects and smooth animations

### ⚙️ Backend Microservices

- **Auth Service** - JWT-based authentication and user management### ⚙️ Backend Microservices

- **Task Service** - Complete CRUD operations for task management

- **Board Service** - Board creation, management, and member permissions- **Auth Service** - JWT-based authentication and user management

- **MongoDB** - Persistent data storage with optimized queries- **Task Service** - Complete CRUD operations for task management

- **Board Service** - Board creation, management, and member permissions

### 🔧 DevOps & Infrastructure- **MongoDB** - Persistent data storage with optimized queries

- **Docker** - Multi-stage optimized container images

- **Kubernetes** - Production-ready orchestration with Minikube### 🔧 DevOps & Infrastructure

- **Terraform** - Complete Infrastructure as Code (IaC)

- **GitHub Actions** - Automated CI/CD pipeline with testing and deployment- **Docker** - Multi-stage optimized container images

- **Nginx** - Reverse proxy for unified API gateway- **Kubernetes** - Production-ready orchestration with Minikube

- **Ngrok** - Public URL tunneling for demo and testing- **Terraform** - Complete Infrastructure as Code (IaC)

- **Trivy** - Security vulnerability scanning- **GitHub Actions** - Automated CI/CD pipeline with testing and deployment

- **Nginx** - Reverse proxy for unified API gateway

---- **Ngrok** - Public URL tunneling for demo and testing

## 🏗️ Architecture---

````## 🏗️ Architecture

┌────────────────────────────────────────────────────────────┐

│                    NGINX Proxy (:9090)                     │```

│                  Public URL via Ngrok                      │┌────────────────────────────────────────────────────────────┐

└─────────┬──────────┬──────────┬──────────┬────────────────┘│                    NGINX Proxy (:9090)                     │

          │          │          │          ││                  Public URL via Ngrok                      │

          ▼          ▼          ▼          ▼└─────────┬──────────┬──────────┬──────────┬────────────────┘

    ┌─────────┐ ┌────────┐ ┌────────┐ ┌────────┐          │          │          │          │

    │ Frontend│ │  Auth  │ │  Task  │ │ Board  │          ▼          ▼          ▼          ▼

    │ React   │ │Service │ │Service │ │Service │    ┌─────────┐ ┌────────┐ ┌────────┐ ┌────────┐

    │  :3000  │ │ :8000  │ │ :5001  │ │ :8002  │    │ Frontend│ │  Auth  │ │  Task  │ │ Board  │

    └─────────┘ └───┬────┘ └───┬────┘ └───┬────┘    │ React   │ │Service │ │Service │ │Service │

                    │          │          │    │  :3000  │ │ :8000  │ │ :5001  │ │ :8002  │

                    └──────────┴──────────┘    └─────────┘ └───┬────┘ └───┬────┘ └───┬────┘

                               │                    │          │          │

                        ┌──────▼──────┐                    └──────────┴──────────┘

                        │   MongoDB   │                               │

                        │   :27018    │                        ┌──────▼──────┐

                        └─────────────┘                        │   MongoDB   │

```                        │   :27018    │

                        └─────────────┘

---```



## 🚀 Quick Start---



### Prerequisites## 🚀 Quick Start

- [Docker Desktop](https://www.docker.com/products/docker-desktop)

- [Minikube](https://minikube.sigs.k8s.io/docs/start/)### Prerequisites

- [kubectl](https://kubernetes.io/docs/tasks/tools/)

- [Node.js 18+](https://nodejs.org/)- [Docker Desktop](https://www.docker.com/products/docker-desktop)

- [ngrok](https://ngrok.com/) (optional, for public URL)- [Minikube](https://minikube.sigs.k8s.io/docs/start/)

- [kubectl](https://kubernetes.io/docs/tasks/tools/)

### One-Command Start- [Node.js 18+](https://nodejs.org/)

- [ngrok](https://ngrok.com/) (optional, for public URL)

```bash

git clone https://github.com/PujanMevawala/smart-task-manager.git### One-Command Start

cd smart-task-manager

./start-fullstack.shdocker build -t task-service:latest .

````

`````

**Access the application at:** `http://localhost:9090`

4. Create Kubernetes Resources:

---

```bash

## 📖 Documentation# Create MongoDB ConfigMap and Secrets

kubectl apply -f k8s/mongo-config.yaml

### Project Structurekubectl apply -f k8s/secrets.yaml



```# Deploy MongoDB

smart-task-manager/kubectl apply -f k8s/mongo-deployment.yaml

├── frontend/               # React frontend applicationkubectl apply -f k8s/mongo-service.yaml

│   ├── src/

│   │   ├── components/    # React components (Dashboard, Tasks, Boards, Auth)# Deploy Auth Service

│   │   ├── context/       # Auth context for state managementkubectl apply -f k8s/auth-deployment.yaml

│   │   └── services/      # API service layerkubectl apply -f k8s/auth-service.yaml

│   ├── Dockerfile         # Multi-stage build for production

│   └── nginx.conf         # Nginx configuration for serving React app# Deploy Board Service

├── auth-service/          # Authentication microservicekubectl apply -f k8s/board-deployment.yaml

│   ├── src/kubectl apply -f k8s/board-service.yaml

│   │   ├── controllers/   # Business logic

│   │   ├── models/        # MongoDB schemas# Deploy Task Service

│   │   ├── routes/        # API routeskubectl apply -f k8s/task-deployment.yaml

│   │   └── middleware/    # JWT authentication middlewarekubectl apply -f k8s/task-service.yaml

│   └── Dockerfile         # Optimized container image

├── task-service/          # Task management microservice# Deploy Ingress

│   └── src/               # Similar structure to auth-servicekubectl apply -f k8s/ingress.yaml

├── board-service/         # Board management microservice````

│   └── src/               # Similar structure to auth-service

├── k8s/                   # Kubernetes manifests5. Verify all pods are running:

│   ├── *-deployment.yaml  # Deployment configurations

│   ├── *-service.yaml     # Service definitions```bash

│   ├── ingress.yaml       # Ingress controller configurationkubectl get pods

│   ├── secrets.yaml       # Sensitive data (JWT secret)```

│   └── mongo-config.yaml  # MongoDB configuration

├── infra/terraform/       # Infrastructure as Code## API Endpoints

│   ├── main.tf           # Main Terraform configuration

│   ├── variables.tf      # Input variables### Auth Service (http://localhost:8000)

│   └── outputs.tf        # Output values

├── scripts/               # Utility scripts- **POST /api/auth/register**

│   ├── build-images.sh   # Build all Docker images

│   ├── deploy-terraform.sh # Deploy with Terraform  - Register a new user

│   └── test-endpoints.sh  # API endpoint testing

├── .github/workflows/     # CI/CD pipeline  ```bash

│   └── ci-cd.yml         # GitHub Actions workflow  curl -X POST -H "Content-Type: application/json" -d '{"name": "Test User", "username": "testuser", "email": "test@example.com", "password": "password123"}' http://localhost:8000/api/auth/register

├── start-fullstack.sh    # Complete application startup script  ```

└── nginx-proxy.conf      # Reverse proxy configuration

```- **POST /api/auth/login**



---  - Login with existing credentials



## 💻 Development  ```bash

  curl -X POST -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "password123"}' http://localhost:8000/api/auth/login

### Local Development Setup  ```



#### 1. Start Minikube- **GET /api/auth/me**

```bash  - Get current user details (requires authentication)

minikube start  ```bash

```  curl -H "Authorization: Bearer <your-token>" http://localhost:8000/api/auth/me

  ```

#### 2. Deploy to Kubernetes

```bash### Task Service (http://localhost:8001)

# Deploy infrastructure

kubectl apply -f k8s/secrets.yaml- **POST /api/tasks**

kubectl apply -f k8s/mongo-config.yaml

kubectl apply -f k8s/mongo-deployment.yaml  - Create a new task

kubectl apply -f k8s/mongo-service.yaml

  ```bash

# Deploy services  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your-token>" -d '{"title": "Test Task", "description": "Test Task Description", "status": "todo"}' http://localhost:8001/api/tasks

kubectl apply -f k8s/auth-deployment.yaml  ```

kubectl apply -f k8s/auth-service.yaml

kubectl apply -f k8s/task-deployment.yaml- **GET /api/tasks**

kubectl apply -f k8s/task-service.yaml  - Get all tasks

kubectl apply -f k8s/board-deployment.yaml  ```bash

kubectl apply -f k8s/board-service.yaml  curl -H "Authorization: Bearer <your-token>" http://localhost:8001/api/tasks

kubectl apply -f k8s/frontend-deployment.yaml  ```

kubectl apply -f k8s/frontend-service.yaml

# Smart Task Manager

# Deploy ingress

kubectl apply -f k8s/ingress.yamlProduction-ready, microservices-based task management application built with Node.js, Express, MongoDB and Kubernetes.

```

This document explains the architecture, local development flow, infrastructure-as-code (Terraform) usage, CI/CD (GitHub Actions), security scanning, and deployment recommendations.

#### 3. Start Port Forwarding

```bash## Table of contents

kubectl port-forward svc/auth-service 8000:80 &

kubectl port-forward svc/task-service 5001:80 &- Project overview

kubectl port-forward svc/board-service 8002:80 &- Architecture

kubectl port-forward svc/frontend-service 3000:3000 &- Getting started (quick)

kubectl port-forward svc/mongo 27018:27017 &- Local development (Docker Compose & Minikube)

```- Infrastructure as Code (Terraform)

- CI/CD (GitHub Actions)

#### 4. Start Nginx Proxy- Security (Trivy integration)

```bash- Production recommendations

nginx -c $(pwd)/nginx-proxy.conf- Troubleshooting & Monitoring

```- Contributing

- License

### Using Terraform

## Project overview

```bash

cd infra/terraformThis repository contains three primary microservices:

terraform init

terraform plan- `auth-service` — user registration, authentication and JWT issuance

terraform apply- `task-service` — CRUD operations for tasks

```- `board-service` — boards management



### Building Docker ImagesEach service is a standalone Node.js app with its own Dockerfile and manifests in `k8s/`. The repository also contains Terraform skeleton under `infra/terraform/` and a CI/CD workflow in `.github/workflows/ci-cd.yml`.



```bash## Architecture

# Build all services

./scripts/build-images.sh- Services communicate internally via Kubernetes DNS and `ClusterIP` services.

- A single Ingress acts as the public API gateway (paths routed to internal services).

# Or build individually- MongoDB runs as a single instance for local/dev; in production use a managed or replicated cluster.

cd auth-service && docker build -t auth-service:latest .- CI builds and scans images; Terraform manages namespace + workloads for local clusters.

cd board-service && docker build -t board-service:v2.0 .

cd task-service && docker build -t task-service:latest .Diagram (logical):

cd frontend && docker build -t frontend:v1.0 .

```Ingress -> auth-service (ClusterIP)

-> task-service (ClusterIP)

----> board-service (ClusterIP)



## 🌐 API DocumentationMongoDB (Stateful) -> auth/task/board (via MONGO_URI)



### Base URLs## Getting started (quick)

- **Local**: `http://localhost:9090`

- **Public**: `https://ulrike-comfier-precontemporaneously.ngrok-free.dev`Prerequisites



### Authentication Endpoints- Docker (Desktop)

- Node.js (18+)

| Method | Endpoint | Description | Auth Required |- kubectl

|--------|----------|-------------|---------------|- minikube or kind

| POST | `/api/auth/register` | Register new user | ❌ |- Terraform (0.13+)

| POST | `/api/auth/login` | Login user | ❌ |

| GET | `/api/auth/me` | Get current user | ✅ |Quick start (dev with Docker Compose)



### Task Endpoints1. Build and run services with Docker Compose (local dev database):



| Method | Endpoint | Description | Auth Required |```bash

|--------|----------|-------------|---------------|docker compose up --build

| GET | `/api/tasks` | Get all tasks | ✅ |```

| POST | `/api/tasks` | Create task | ✅ |

| PUT | `/api/tasks/:id` | Update task | ✅ |2. The services will be available on:

| DELETE | `/api/tasks/:id` | Delete task | ✅ |

- Auth: http://localhost:8000

### Board Endpoints- Task: http://localhost:8001

- Board: http://localhost:8002

| Method | Endpoint | Description | Auth Required |

|--------|----------|-------------|---------------|Use the provided API examples in `k8s/` or `README` for testing endpoints.

| GET | `/api/boards` | Get all boards | ✅ |

| POST | `/api/boards` | Create board | ✅ |## Local Kubernetes (minikube) — recommended flow

| PUT | `/api/boards/:id` | Update board | ✅ |

| DELETE | `/api/boards/:id` | Delete board | ✅ |1. Start minikube and enable ingress:

| POST | `/api/boards/:id/members` | Add member | ✅ |

| DELETE | `/api/boards/:id/members/:userId` | Remove member | ✅ |```bash

minikube start

### Example Requestsminikube addons enable ingress

```

#### Register User

```bash2. Build images locally and load into minikube:

curl -X POST http://localhost:9090/api/auth/register \

  -H "Content-Type: application/json" \````bash

  -d '{docker build -t auth-service:latest ./auth-service

    "name": "John Doe",docker build -t task-service:latest ./task-service

    "username": "johndoe",# Smart Task Manager — Runbook & Summary

    "email": "john@example.com",

    "password": "SecurePass123"This repository contains a simple microservices task manager (three Node.js services) plus Kubernetes manifests, a Terraform skeleton, and a CI/CD workflow. This README explains what changed, how to run everything locally (Docker Compose) and on a local Kubernetes cluster (minikube), and how secrets are handled.

  }'

```## What changed (recent work)

- Converted Dockerfiles to multi-stage builds for smaller production images.

#### Create Task- Kubernetes Services use `ClusterIP` for internal DNS-based service-to-service communication; a single Ingress is the public entry point.

```bash- Added a Terraform skeleton (`infra/terraform/`) to manage namespace/deployments/services locally.

curl -X POST http://localhost:9090/api/tasks \- Added GitHub Actions CI with a Trivy scan step for security checks.

  -H "Content-Type: application/json" \- Normalized `.dockerignore` and `.gitignore`. Tracked `.env` files were removed and `*.env.example` files were added for each service.

  -H "Authorization: Bearer YOUR_JWT_TOKEN" \

  -d '{## Short repo layout

    "title": "Complete project",- `auth-service/`, `task-service/`, `board-service/` — Node.js services

    "description": "Finish all remaining tasks",- `k8s/` — Kubernetes manifests (deployments, services, ingress, mongo)

    "status": "todo",- `infra/terraform/` — Terraform skeleton

    "boardId": "BOARD_ID_HERE"- `.github/workflows/ci-cd.yml` — CI pipeline (build/test/scan)

  }'

```## Secrets and `.env` files (IMPORTANT)

- Local `.env` files are not tracked. Copy `*.env.example` to `*.env` and set secure values locally. Do not commit `.env`.

---- Prefer creating Kubernetes secrets at deploy time from local `.env` files. Example:



## 🔒 Security```bash

# create/update k8s secret from auth-service .env (local)

### Security Featureskubectl create secret generic smart-secrets --from-env-file=auth-service/.env --dry-run=client -o yaml | kubectl apply -f -

- ✅ JWT token-based authentication````

- ✅ Password hashing with bcrypt

- ✅ Environment variable management for secretsIf a secret was pushed to a remote previously, rotate it immediately. I can prepare a safe history-purge plan if needed.

- ✅ Kubernetes Secrets for sensitive data

- ✅ Security scanning with Trivy---

- ✅ Rate limiting on API endpoints

- ✅ CORS configuration## Quick run — Docker Compose (fast local dev)



### Security Scanning1. Copy examples locally (do not commit these files):

```bash

# Scan Docker images for vulnerabilities```bash

trivy image auth-service:latestcp auth-service/.env.example auth-service/.env

trivy image task-service:latestcp task-service/.env.example task-service/.env

trivy image board-service:v2.0cp board-service/.env.example board-service/.env

trivy image frontend:v1.0# Edit each .env to replace JWT_SECRET with a secure value

`````

---2. Start the stack:

## 🧪 Testing```bash

docker compose up --build

### Run API Tests```

```bash

./scripts/test-endpoints.sh3. Services:

```

- Auth: http://localhost:8000

### Manual Testing- Task: http://localhost:8001

````bash- Board: http://localhost:8002

# Check all pods are running

kubectl get pods4. Stop:



# Check services```bash

kubectl get svcdocker compose down

````

# View logs

kubectl logs <pod-name>---

# Test frontend## Run on Kubernetes (minikube)

curl http://localhost:9090

1. Start minikube and enable ingress:

# Test API

curl http://localhost:9090/api/auth/health```bash

````minikube start

minikube addons enable ingress

---```



## 🔧 Troubleshooting2. Build images and load into minikube (no registry required):



### Common Issues```bash

docker build -t auth-service:latest ./auth-service

**Pods not starting:**docker build -t task-service:latest ./task-service

```bashdocker build -t board-service:latest ./board-service

kubectl describe pod <pod-name>

kubectl logs <pod-name>minikube image load auth-service:latest

```minikube image load task-service:latest

minikube image load board-service:latest

**Port already in use:**```

```bash

# Kill existing processes3. Create Mongo config and secrets (preferred: from local `.env`):

pkill -f "kubectl port-forward"

pkill -f "nginx"```bash

```kubectl apply -f k8s/mongo-config.yaml

kubectl create secret generic smart-secrets --from-env-file=auth-service/.env --dry-run=client -o yaml | kubectl apply -f -

**MongoDB connection issues:**```

```bash

# Check MongoDB is running4. Deploy manifests:

kubectl get pods | grep mongo

```bash

# Check MongoDB logskubectl apply -f k8s/mongo-deployment.yaml

kubectl logs <mongo-pod-name>kubectl apply -f k8s/mongo-service.yaml

````

kubectl apply -f k8s/auth-deployment.yaml

**Clear and restart:**kubectl apply -f k8s/auth-service.yaml

```bashkubectl apply -f k8s/task-deployment.yaml

# Delete all resourceskubectl apply -f k8s/task-service.yaml

kubectl delete all --allkubectl apply -f k8s/board-deployment.yaml

kubectl apply -f k8s/board-service.yaml

# Reapply configurations

kubectl apply -f k8s/kubectl apply -f k8s/ingress.yaml

```

---5. Verify:

## 📊 Monitoring```bash

kubectl get pods -A

### View Application Logskubectl get svc -n default

````bashkubectl get ingress

# Frontend logs```

kubectl logs -f deployment/frontend

Tip: `minikube service <svc> --url` gives a quick service URL for debugging.

# Service logs

kubectl logs -f deployment/auth-service---

kubectl logs -f deployment/task-service

kubectl logs -f deployment/board-service## CI/CD and image registry

````

- The workflow builds and scans images but doesn't push them to a registry by default. To enable CI-driven deploys you should:

### Ngrok Inspection Dashboard 1. Create a registry (GHCR/Docker Hub/ECR) and a service account or token.

Access at: `http://localhost:4040` 2. Add registry credentials as GitHub Secrets.

- Real-time request inspection 3. Update `.github/workflows/ci-cd.yml` to login and push images.

- Replay requests 4. Update Terraform/K8s to reference `registry/image:tag` instead of local `auth-service:latest`.

- View response times

---

---

## Security & production notes

## 🚀 Deployment

- Do not store secrets as plain files in git. Use secret managers (Vault, cloud KMS) and generate k8s secrets at deploy time.

### Production Deployment Checklist- Add readiness/liveness probes, resource requests/limits, and PDBs before production.

- [ ] Update environment variables in `k8s/secrets.yaml`- Add image and dependency scanning in CI (Trivy + npm audit/Snyk).

- [ ] Configure production MongoDB cluster

- [ ] Set up persistent volumes for data## Files changed recently (high level)

- [ ] Configure horizontal pod autoscaling

- [ ] Set up monitoring (Prometheus/Grafana)- Multi-stage Dockerfiles for services

- [ ] Configure logging aggregation- Per-service `.dockerignore` files

- [ ] Set up SSL certificates- `k8s/` manifests updated to use `ClusterIP` services, with an `ingress.yaml` for external routing

- [ ] Configure backup strategy- `infra/terraform/` skeleton added

- [ ] Review resource limits- `.github/workflows/ci-cd.yml` added (includes Trivy scan)

- [ ] Enable security policies- `.env.example` files added; tracked `.env` files removed

### CI/CD Pipeline## Next optional tasks I can do for you

The GitHub Actions workflow automatically:

1. Builds Docker images on push to `main`- Replace `k8s/secrets.yaml` with `k8s/secrets.yaml.template` and commit (to avoid storing base64 secrets in git).

2. Runs security scans with Trivy- Add a `Makefile` or `scripts/dev-deploy.sh` that automates build/load/apply for minikube.

3. Runs unit tests- Run a full git-history secret scan and prepare a purge plan if any secrets are present in history.

4. Pushes images to registry (if configured)

5. Deploys to staging environment (if configured)Prepared on: 2025-10-25

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Pujan Mevawala**

- GitHub: [@PujanMevawala](https://github.com/PujanMevawala)
- Repository: [smart-task-manager](https://github.com/PujanMevawala/smart-task-manager)

---

## 🙏 Acknowledgments

- React.js for the amazing frontend framework
- Node.js and Express for the backend
- MongoDB for the database
- Kubernetes for orchestration
- Docker for containerization
- GitHub Actions for CI/CD
- Ngrok for public URL tunneling

---

<div align="center">

**Built with ❤️ using modern DevOps practices**

⭐ Star this repo if you find it helpful!

</div>
