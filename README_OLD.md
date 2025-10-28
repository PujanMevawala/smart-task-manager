<div align="center">

# 🚀 Smart Task Manager

[![CI/CD](https://github.com/PujanMevawala/smart-task-manager/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/PujanMevawala/smart-task-manager/actions)
[![Docker](https://img.shields.io/badge/Docker-Multi--stage-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Terraform](https://img.shields.io/badge/IaC-Terraform-7B42BC?logo=terraform&logoColor=white)](https://www.terraform.io/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**A production-ready, full-stack task management application with modern microservices architecture, containerization, and automated DevOps pipeline.**

[Live Demo](https://ulrike-comfier-precontemporaneously.ngrok-free.dev) • [Documentation](#-documentation) • [Quick Start](#-quick-start)

</div>

---

## ✨ Features

### 🎨 Frontend

- **Modern React UI** with professional blue-teal gradient theme
- **Responsive Dashboard** with real-time task and board statistics
- **Kanban Board** with drag-and-drop task management across three states (To Do, In Progress, Done)
- **Board Management** with member collaboration features
- **JWT Authentication** with secure login/register flows
- **Professional Design** with glassmorphism effects and smooth animations

### ⚙️ Backend Microservices

- **Auth Service** - JWT-based authentication and user management
- **Task Service** - Complete CRUD operations for task management
- **Board Service** - Board creation, management, and member permissions
- **MongoDB** - Persistent data storage with optimized queries

### 🔧 DevOps & Infrastructure

- **Docker** - Multi-stage optimized container images
- **Kubernetes** - Production-ready orchestration with Minikube
- **Terraform** - Complete Infrastructure as Code (IaC)
- **GitHub Actions** - Automated CI/CD pipeline with testing and deployment
- **Nginx Ingress** - Intelligent routing and load balancing
- **Ngrok** - Public URL tunneling for demo and testing
- **Trivy & CodeQL** - Automated security vulnerability scanning

---

## 🏗️ System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         🌐 PUBLIC ACCESS LAYER                          │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                   Ngrok Public URL (HTTPS)                      │   │
│  │     https://ulrike-comfier-precontemporaneously.ngrok-free.dev  │   │
│  └────────────────────────────┬────────────────────────────────────┘   │
└───────────────────────────────┼────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    🔀 KUBERNETES INGRESS LAYER                          │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │              Nginx Ingress Controller (LoadBalancer)             │  │
│  │                                                                  │  │
│  │  Routes:                                                         │  │
│  │   • /                    → Frontend Service (Port 3000)          │  │
│  │   • /api/auth/*          → Auth Service (Port 80 → 8000)        │  │
│  │   • /api/tasks/*         → Task Service (Port 80 → 5001)        │  │
│  │   • /api/boards/*        → Board Service (Port 80 → 8002)       │  │
│  └─────┬──────────────┬───────────────┬──────────────┬─────────────┘  │
└────────┼──────────────┼───────────────┼──────────────┼────────────────┘
         │              │               │              │
         ▼              ▼               ▼              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     ☸️  KUBERNETES SERVICES LAYER                       │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │   Frontend   │  │     Auth     │  │     Task     │  │   Board    │ │
│  │   Service    │  │   Service    │  │   Service    │  │  Service   │ │
│  │  (ClusterIP) │  │  (ClusterIP) │  │  (ClusterIP) │  │(ClusterIP) │ │
│  │   Port: 3000 │  │   Port: 80   │  │   Port: 80   │  │  Port: 80  │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘ │
└─────────┼──────────────────┼──────────────────┼────────────────┼────────┘
          │                  │                  │                │
          ▼                  ▼                  ▼                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      🐳 KUBERNETES PODS LAYER                           │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │   Frontend   │  │     Auth     │  │     Task     │  │   Board    │ │
│  │     Pod      │  │     Pod      │  │     Pod      │  │    Pod     │ │
│  │              │  │              │  │              │  │            │ │
│  │  ┌────────┐  │  │  ┌────────┐  │  │  ┌────────┐  │  │ ┌────────┐ │ │
│  │  │ React  │  │  │  │Node.js │  │  │  │Node.js │  │  │ │Node.js │ │ │
│  │  │  +     │  │  │  │Express │  │  │  │Express │  │  │ │Express │ │ │
│  │  │ Nginx  │  │  │  │  +     │  │  │  │  +     │  │  │ │  +     │ │ │
│  │  │Container│ │  │  │Mongoose│  │  │  │Mongoose│  │  │ │Mongoose│ │ │
│  │  └────────┘  │  │  └────┬───┘  │  │  └────┬───┘  │  │ └────┬───┘ │ │
│  │              │  │       │      │  │       │      │  │      │     │ │
│  │  Resources:  │  │       │      │  │       │      │  │      │     │ │
│  │  CPU: 100m   │  │       │      │  │       │      │  │      │     │ │
│  │  MEM: 128Mi  │  │       │      │  │       │      │  │      │     │ │
│  └──────────────┘  │       │      │  │       │      │  │      │     │ │
│                    │       │      │  │       │      │  │      │     │ │
│  Liveness/         │       │      │  │       │      │  │      │     │ │
│  Readiness Probes  │       │      │  │       │      │  │      │     │ │
│  ✓ Configured      └───────┼──────┘  └───────┼──────┘  └──────┼─────┘ │
└────────────────────────────┼─────────────────┼─────────────────┼───────┘
                             │                 │                 │
                             └─────────┬───────┴─────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       💾 DATABASE LAYER                                 │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    MongoDB Service (ClusterIP)                   │  │
│  │                         Port: 27017                              │  │
│  └────────────────────────────┬─────────────────────────────────────┘  │
│                               │                                        │
│                               ▼                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                       MongoDB Pod                                │  │
│  │                                                                  │  │
│  │  ┌────────────────────────────────────────────────────────────┐ │  │
│  │  │              MongoDB 6.0 Container                         │ │  │
│  │  │                                                            │ │  │
│  │  │  Collections:                                              │ │  │
│  │  │   • users      - User accounts and authentication          │ │  │
│  │  │   • tasks      - Task items with status tracking           │ │  │
│  │  │   • boards     - Board definitions and members             │ │  │
│  │  │                                                            │ │  │
│  │  │  Storage: EmptyDir (ephemeral)                             │ │  │
│  │  │  Resources: CPU 250m, Memory 512Mi                         │ │  │
│  │  └────────────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                   🔐 CONFIGURATION & SECRETS LAYER                      │
│                                                                         │
│  ┌──────────────────────┐        ┌──────────────────────────────────┐  │
│  │   ConfigMap          │        │      Kubernetes Secrets          │  │
│  │   (mongo-config)     │        │      (smart-secrets)             │  │
│  │                      │        │                                  │  │
│  │  • MONGO_URI         │        │  • JWT_SECRET (base64 encoded)   │  │
│  └──────────────────────┘        └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Application Flow

```
1. User Access
   └─> https://ngrok.url/
       └─> Minikube Tunnel (LoadBalancer)
           └─> Nginx Ingress Controller

2. Frontend Request Flow
   └─> User visits root (/)
       └─> Ingress routes to Frontend Service
           └─> Frontend Pod (React + Nginx)
               └─> Serves static React application

3. Authentication Flow
   └─> User submits login/register
       └─> Frontend calls /api/auth/*
           └─> Ingress routes to Auth Service
               └─> Auth Pod validates credentials
                   └─> MongoDB (users collection)
                       └─> Returns JWT token

4. Task Management Flow
   └─> User creates/updates task
       └─> Frontend calls /api/tasks/*
           └─> Ingress routes to Task Service
               └─> Task Pod (validates JWT)
                   └─> MongoDB (tasks collection)
                       └─> Returns task data

5. Board Management Flow
   └─> User creates/manages board
       └─> Frontend calls /api/boards/*
           └─> Ingress routes to Board Service
               └─> Board Pod (validates JWT + permissions)
                   └─> MongoDB (boards collection)
                       └─> Returns board data
```

---

## 🔄 CI/CD Pipeline Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         GitHub Repository                                │
│                    (Push/PR to main or develop)                          │
└────────────────────────────┬─────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      GitHub Actions Workflow                            │
│                         (.github/workflows/ci-cd.yml)                   │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │  Stage 1: Code Quality & Security Scan                           │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │ │
│  │  │ Checkout Code│→ │Install Deps  │→ │ Run Tests (npm test) │   │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────────┘   │ │
│  │                                                ↓                  │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │ │
│  │  │Trivy Security│→ │ CodeQL SAST  │→ │Upload SARIF Reports  │   │ │
│  │  │   Scanner    │  │   Analysis   │  │  to GitHub Security  │   │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────────┘   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                 ↓                                       │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │  Stage 2: Build & Push Docker Images                             │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │ │
│  │  │ Build Auth   │  │ Build Task   │  │  Build Board         │   │ │
│  │  │ Service Image│  │ Service Image│  │  Service Image       │   │ │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────────────┘   │ │
│  │         │                  │                  │                   │ │
│  │         └──────────────────┴──────────────────┘                   │ │
│  │                             ↓                                      │ │
│  │  ┌──────────────────────────────────────────────────────────┐    │ │
│  │  │         Push Images to Docker Hub                        │    │ │
│  │  │  • docker.io/pujan/auth-service:latest                   │    │ │
│  │  │  • docker.io/pujan/task-service:latest                   │    │ │
│  │  │  • docker.io/pujan/board-service:latest                  │    │ │
│  │  └──────────────────────────────────────────────────────────┘    │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                 ↓                                       │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │  Stage 3: Deploy to Kubernetes                                   │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │ │
│  │  │Setup Minikube│→ │Apply K8s YAML│→ │ Verify Deployments   │   │ │
│  │  │ + kubectl    │  │  Manifests   │  │  Rollout Status      │   │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────────┘   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster (Minikube)                        │
│                 ✅ All Services Deployed & Running                      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

- **React 18.2** - Modern UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **JWT Decode** - Token management
- **CSS3** - Styling with glassmorphism effects

### Backend Services

- **Node.js 18** - Runtime environment
- **Express.js** - Web framework
- **MongoDB 6.0** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### DevOps & Infrastructure

- **Docker** - Containerization
- **Kubernetes** - Container orchestration
- **Minikube** - Local Kubernetes cluster
- **Terraform** - Infrastructure as Code
- **GitHub Actions** - CI/CD automation
- **Nginx** - Reverse proxy & ingress
- **Ngrok** - Public URL tunneling

### Security

- **Trivy** - Container vulnerability scanning
- **CodeQL** - Static application security testing
- **GitHub Security** - SARIF report integration
- **Kubernetes Secrets** - Sensitive data management

---

## 🚀 Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) - For containerization
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) - Local Kubernetes cluster
- [kubectl](https://kubernetes.io/docs/tasks/tools/) - Kubernetes CLI
- [Terraform](https://www.terraform.io/downloads) - Infrastructure as Code
- [Node.js 18+](https://nodejs.org/) - For local development
- [ngrok](https://ngrok.com/) (optional) - For public URL access

### Option 1: Terraform Deployment (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/PujanMevawala/smart-task-manager.git
cd smart-task-manager

# 2. Start Minikube cluster
minikube start --driver=docker
minikube addons enable ingress

# 3. Build Docker images
docker build -t auth-service:latest ./auth-service
docker build -t task-service:latest ./task-service
docker build -t board-service:latest ./board-service
docker build -t frontend:latest ./frontend

# 4. Load images into Minikube
minikube image load auth-service:latest
minikube image load task-service:latest
minikube image load board-service:latest
minikube image load frontend:latest

# 5. Deploy infrastructure using Terraform
cd infra/terraform
terraform init
terraform plan -out=tfplan
terraform apply tfplan
cd ../..

# 6. Deploy frontend (not in Terraform)
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

# 7. Start Minikube tunnel (in a separate terminal)
minikube tunnel

# 8. Access the application
# Setup port-forward for frontend:
kubectl port-forward -n default svc/frontend-service 3000:3000

# Open browser: http://localhost:3000
```

### Option 2: Kubernetes Manifests Deployment

```bash
# 1. Clone and start Minikube
git clone https://github.com/PujanMevawala/smart-task-manager.git
cd smart-task-manager
minikube start --driver=docker
minikube addons enable ingress

# 2. Build and load Docker images (same as Option 1)
docker build -t auth-service:latest ./auth-service
docker build -t task-service:latest ./task-service
docker build -t board-service:latest ./board-service
docker build -t frontend:latest ./frontend

minikube image load auth-service:latest
minikube image load task-service:latest
minikube image load board-service:latest
minikube image load frontend:latest

# 3. Apply Kubernetes manifests
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
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yaml

# 4. Verify deployments
kubectl get pods -n default
kubectl get svc -n default

# 5. Access the application
kubectl port-forward -n default svc/frontend-service 3000:3000
# Open browser: http://localhost:3000
```

### Option 3: Docker Compose (Development)

```bash
# 1. Clone repository
git clone https://github.com/PujanMevawala/smart-task-manager.git
cd smart-task-manager

# 2. Start all services
docker-compose up -d

# 3. Access the application
# Frontend: http://localhost:3000
# Nginx Proxy: http://localhost:9090
```

### Accessing via Public URL (Ngrok)

```bash
# In a separate terminal, start ngrok tunnel
ngrok http 3000

# Or use the provided script:
chmod +x scripts/start-ngrok.sh
./scripts/start-ngrok.sh

# Copy the generated HTTPS URL and share it
# Example: https://your-unique-url.ngrok-free.app
```

---

- [ngrok](https://ngrok.com/) (optional, for public URL)- [Minikube](https://minikube.sigs.k8s.io/docs/start/)

- [kubectl](https://kubernetes.io/docs/tasks/tools/)

### One-Command Start- [Node.js 18+](https://nodejs.org/)

- [ngrok](https://ngrok.com/) (optional, for public URL)

```bash

git clone https://github.com/PujanMevawala/smart-task-manager.git### One-Command Start

cd smart-task-manager

./start-fullstack.shdocker build -t task-service:latest .

```

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
