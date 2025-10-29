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

## 📋 Table of Contents

- [Features](#-features)
- [System Architecture](#️-system-architecture)
- [Technology Stack](#️-technology-stack)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Deployment](#-deployment)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

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
- **Auth Service** (Port 8000) - JWT-based authentication and user management
- **Task Service** (Port 5001) - Complete CRUD operations for task management
- **Board Service** (Port 8002) - Board creation, management, and member permissions
- **MongoDB** (Port 27017) - Persistent data storage with optimized queries

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

### Application Request Flow

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 1. Access Application
     ▼
┌─────────────────────────┐
│  Ngrok Public URL       │
│  (HTTPS Tunnel)         │
└────────┬────────────────┘
         │
         │ 2. Route to Cluster
         ▼
┌─────────────────────────┐
│ Minikube Tunnel         │
│ (LoadBalancer Exposure) │
└────────┬────────────────┘
         │
         │ 3. Ingress Routing
         ▼
┌─────────────────────────────────────────┐
│      Nginx Ingress Controller           │
│  ┌───────────────────────────────────┐  │
│  │ Path: /            → Frontend     │  │
│  │ Path: /api/auth/*  → Auth Service │  │
│  │ Path: /api/tasks/* → Task Service │  │
│  │ Path: /api/boards/*→ Board Service│  │
│  └───────────────────────────────────┘  │
└─────────┬─────────┬─────────┬───────────┘
          │         │         │
          │ 4. Service Discovery (Kubernetes DNS)
          │         │         │
    ┌─────▼───┐ ┌───▼────┐ ┌─▼──────┐
    │Frontend │ │ Auth   │ │ Task   │
    │ Pod     │ │ Pod    │ │ Pod    │
    └─────────┘ └───┬────┘ └───┬────┘
                    │          │
                    │ 5. Database Query
                    ▼          ▼
              ┌──────────────────┐
              │   MongoDB Pod    │
              │  (Data Storage)  │
              └──────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| React Router | 6.x | Client-side routing |
| Axios | 1.x | HTTP client |
| JWT Decode | 3.x | Token management |
| CSS3 | - | Styling with glassmorphism |

### Backend Services
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x | Runtime environment |
| Express.js | 4.x | Web framework |
| MongoDB | 6.0 | NoSQL database |
| Mongoose | 7.x | ODM for MongoDB |
| JWT | 9.x | Authentication |
| bcryptjs | 2.x | Password hashing |
| CORS | 2.x | Cross-origin requests |

### DevOps & Infrastructure
| Technology | Version | Purpose |
|------------|---------|---------|
| Docker | 24.x | Containerization |
| Kubernetes | 1.34.0 | Container orchestration |
| Minikube | 1.37.0 | Local K8s cluster |
| Terraform | 1.x | Infrastructure as Code |
| GitHub Actions | - | CI/CD automation |
| Nginx | latest | Reverse proxy & ingress |
| Ngrok | 3.x | Public URL tunneling |

### Security & Monitoring
| Technology | Purpose |
|------------|---------|
| Trivy | Container vulnerability scanning |
| CodeQL | Static application security testing |
| GitHub Security | SARIF report integration |
| Kubernetes Secrets | Sensitive data management |

---

## 🚀 Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) - For containerization
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) - Local Kubernetes cluster
- [kubectl](https://kubernetes.io/docs/tasks/tools/) - Kubernetes CLI
- [Terraform](https://www.terraform.io/downloads) - Infrastructure as Code
- [Node.js 18+](https://nodejs.org/) - For local development (optional)
- [ngrok](https://ngrok.com/) - For public URL access (optional)

### Option 1: Terraform Deployment (Recommended) ⭐

```bash
# 1. Clone the repository
git clone https://github.com/PujanMevawala/smart-task-manager.git
cd smart-task-manager

# 2. Start Minikube cluster
minikube start --driver=docker
minikube addons enable ingress

# 3. Build Docker images for all services
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

# 6. Deploy frontend (not managed by Terraform)
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

# 7. Verify all pods are running
kubectl get pods -n default

# 8. Access the application
# Start port-forward for frontend:
kubectl port-forward -n default svc/frontend-service 3000:3000

# Open browser: http://localhost:3000
```

### Option 2: Kubernetes Manifests Deployment

```bash
# 1-4. Same as Option 1 (clone, start minikube, build & load images)

# 5. Apply all Kubernetes manifests
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

# 6. Verify deployments
kubectl get pods -n default
kubectl get svc -n default

# 7. Access the application
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
# Auth API: http://localhost:8000
# Task API: http://localhost:5001
# Board API: http://localhost:8002
```

### Accessing via Public URL (Ngrok)

```bash
# Start ngrok tunnel (in a separate terminal)
ngrok http 3000

# Or use the provided script:
chmod +x scripts/start-ngrok.sh
./scripts/start-ngrok.sh

# Copy the generated HTTPS URL
# Example: https://your-unique-id.ngrok-free.app
```

---

## 🌐 API Documentation

### Base URLs

- **Local Development**: `http://localhost:9090`
- **Local K8s (Port-forward)**: `http://localhost:3000`
- **Public**: `https://ulrike-comfier-precontemporaneously.ngrok-free.dev`

### Authentication Endpoints

#### Register New User
```bash
POST /api/auth/register

# Request Body:
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

# Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Login
```bash
POST /api/auth/login

# Request Body:
{
  "email": "john@example.com",
  "password": "SecurePass123"
}

# Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

#### Get Current User
```bash
GET /api/auth/me
Authorization: Bearer <JWT_TOKEN>

# Response:
{
  "id": "64f5a1b2c3d4e5f6a7b8c9d0",
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com"
}
```

### Task Endpoints

#### Create Task
```bash
POST /api/tasks
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "todo",
  "boardId": "64f5b1c2d3e4f5a6b7c8d9e0"
}
```

#### Get All Tasks
```bash
GET /api/tasks
Authorization: Bearer <JWT_TOKEN>

# Response:
[
  {
    "_id": "64f5c1d2e3f4a5b6c7d8e9f0",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "todo",
    "boardId": "64f5b1c2d3e4f5a6b7c8d9e0",
    "createdBy": "64f5a1b2c3d4e5f6a7b8c9d0",
    "createdAt": "2025-10-28T10:00:00.000Z"
  }
]
```

#### Update Task
```bash
PUT /api/tasks/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "status": "in-progress"
}
```

#### Delete Task
```bash
DELETE /api/tasks/:id
Authorization: Bearer <JWT_TOKEN>
```

### Board Endpoints

#### Create Board
```bash
POST /api/boards
Authorization: Bearer <JWT_TOKEN>

{
  "name": "Q4 2025 Sprint",
  "description": "Tasks for Q4 development sprint"
}
```

#### Get All Boards
```bash
GET /api/boards
Authorization: Bearer <JWT_TOKEN>
```

#### Add Member to Board
```bash
POST /api/boards/:boardId/members
Authorization: Bearer <JWT_TOKEN>

{
  "userId": "64f5a1b2c3d4e5f6a7b8c9d1"
}
```

---

## 💻 Development

### Project Structure

```
smart-task-manager/
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # GitHub Actions CI/CD pipeline
├── frontend/                      # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── Auth.css
│   │   │   ├── Boards.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Header.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Tasks.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js     # Authentication context
│   │   ├── services/
│   │   │   ├── api.js             # API client setup
│   │   │   ├── authService.js     # Auth API calls
│   │   │   └── taskService.js     # Task API calls
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile                 # Multi-stage build
│   ├── nginx.conf                 # Nginx configuration
│   └── package.json
├── auth-service/                  # Authentication microservice
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   └── authController.js  # Auth business logic
│   │   ├── middleware/
│   │   │   └── authMiddleware.js  # JWT verification
│   │   ├── models/
│   │   │   └── User.js            # User schema
│   │   ├── routes/
│   │   │   └── authRoutes.js      # API routes
│   │   └── server.js              # Express app entry
│   ├── Dockerfile
│   └── package.json
├── task-service/                  # Task management microservice
│   ├── src/
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   ├── models/
│   │   │   ├── Task.js
│   │   │   └── Board.js
│   │   ├── routes/
│   │   │   └── taskRoutes.js
│   │   └── server.js
│   ├── Dockerfile
│   └── package.json
├── board-service/                 # Board management microservice
│   ├── src/
│   │   ├── controllers/
│   │   │   └── boardController.js
│   │   ├── models/
│   │   │   ├── Board.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   └── boardRoutes.js
│   │   └── server.js
│   ├── Dockerfile
│   └── package.json
├── k8s/                           # Kubernetes manifests
│   ├── auth-deployment.yaml
│   ├── auth-service.yaml
│   ├── board-deployment.yaml
│   ├── board-service.yaml
│   ├── task-deployment.yaml
│   ├── task-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── mongo-deployment.yaml
│   ├── mongo-service.yaml
│   ├── mongo-config.yaml          # ConfigMap for MongoDB URI
│   ├── secrets.yaml               # Secrets for JWT
│   └── ingress.yaml               # Ingress routing
├── infra/
│   └── terraform/                 # Infrastructure as Code
│       ├── main.tf                # Main Terraform config
│       ├── provider.tf            # Provider configuration
│       ├── variables.tf           # Input variables
│       ├── outputs.tf             # Output values
│       └── terraform.tfstate      # State file
├── scripts/                       # Utility scripts
│   ├── build-images.sh            # Build all Docker images
│   ├── deploy-terraform.sh        # Deploy with Terraform
│   ├── setup-ngrok.sh             # Setup ngrok
│   ├── start-ngrok.sh             # Start ngrok tunnel
│   └── test-endpoints.sh          # Test API endpoints
├── docker-compose.yml             # Docker Compose for local dev
├── nginx-proxy.conf               # Nginx reverse proxy config
├── README.md                      # This file
└── DEPLOYMENT_EVALUATION_REPORT.md # Deployment evaluation (20/20)
```

### Local Development Workflow

#### 1. Start MongoDB Locally
```bash
docker run -d -p 27017:27017 --name mongo mongo:6.0
```

#### 2. Run Services Individually

**Auth Service:**
```bash
cd auth-service
npm install
npm run dev  # Runs on port 8000
```

**Task Service:**
```bash
cd task-service
npm install
npm run dev  # Runs on port 5001
```

**Board Service:**
```bash
cd board-service
npm install
npm run dev  # Runs on port 8002
```

**Frontend:**
```bash
cd frontend
npm install
npm start    # Runs on port 3000
```

#### 3. Environment Variables

Create `.env` files in each service directory:

**auth-service/.env:**
```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

**task-service/.env:**
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

**board-service/.env:**
```env
PORT=8002
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

---

## 🚢 Deployment

### Terraform Infrastructure

The project uses Terraform to manage Kubernetes resources:

```hcl
# infra/terraform/main.tf
resource "kubernetes_namespace" "app_ns" {
  metadata {
    name = "default"
  }
}

resource "kubernetes_secret" "app_secrets" {
  metadata {
    name      = "smart-secrets"
    namespace = "default"
  }
  data = {
    JWT_SECRET = base64encode("your-secret-key")
  }
}

resource "kubernetes_deployment" "auth" {
  # Auth service deployment configuration
}

resource "kubernetes_service" "auth" {
  # Auth service configuration
}

# Similar resources for task, board, and mongo services
```

**Deploy with Terraform:**
```bash
cd infra/terraform
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

**Destroy infrastructure:**
```bash
terraform destroy
```

### Manual Kubernetes Deployment

```bash
# Create namespace (optional)
kubectl create namespace smart-task-manager

# Apply configurations
kubectl apply -f k8s/secrets.yaml -n smart-task-manager
kubectl apply -f k8s/mongo-config.yaml -n smart-task-manager
kubectl apply -f k8s/mongo-deployment.yaml -n smart-task-manager
kubectl apply -f k8s/mongo-service.yaml -n smart-task-manager
kubectl apply -f k8s/auth-deployment.yaml -n smart-task-manager
kubectl apply -f k8s/auth-service.yaml -n smart-task-manager
kubectl apply -f k8s/task-deployment.yaml -n smart-task-manager
kubectl apply -f k8s/task-service.yaml -n smart-task-manager
kubectl apply -f k8s/board-deployment.yaml -n smart-task-manager
kubectl apply -f k8s/board-service.yaml -n smart-task-manager
kubectl apply -f k8s/frontend-deployment.yaml -n smart-task-manager
kubectl apply -f k8s/frontend-service.yaml -n smart-task-manager
kubectl apply -f k8s/ingress.yaml -n smart-task-manager

# Verify deployments
kubectl get all -n smart-task-manager
```

### Accessing the Application

#### Via Port-Forward
```bash
kubectl port-forward -n default svc/frontend-service 3000:3000
# Access: http://localhost:3000
```

#### Via Ingress (with Minikube Tunnel)
```bash
# In one terminal:
minikube tunnel

# In another terminal:
kubectl patch svc ingress-nginx-controller -n ingress-nginx -p '{"spec":{"type":"LoadBalancer"}}'

# Access: http://localhost
```

#### Via Ngrok (Public URL)
```bash
# Start port-forward first
kubectl port-forward -n default svc/frontend-service 3000:3000 &

# Start ngrok
ngrok http 3000

# Copy the HTTPS URL provided by ngrok
```

---

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for automated CI/CD:

### Pipeline Stages

```
┌──────────────────────────────────────────────────────────┐
│          Stage 1: Code Quality & Security                │
├──────────────────────────────────────────────────────────┤
│ • Checkout code                                          │
│ • Setup Node.js 18                                       │
│ • Install dependencies (npm ci)                          │
│ • Run tests (npm test)                                   │
│ • Trivy vulnerability scan                               │
│ • CodeQL security analysis                               │
│ • Upload SARIF to GitHub Security                        │
└──────────────────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────────┐
│          Stage 2: Build & Push Docker Images             │
├──────────────────────────────────────────────────────────┤
│ • Build auth-service:latest                              │
│ • Build task-service:latest                              │
│ • Build board-service:latest                             │
│ • Build frontend:v1.0                                    │
│ • Tag images with commit SHA                             │
│ • Push to Docker Hub (optional)                          │
└──────────────────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────────┐
│          Stage 3: Deploy to Kubernetes                   │
├──────────────────────────────────────────────────────────┤
│ • Setup Minikube cluster                                 │
│ • Setup kubectl CLI                                      │
│ • Load Docker images to Minikube                         │
│ • Apply Kubernetes manifests                             │
│ • Verify deployment rollout status                       │
│ • Run health checks                                      │
└──────────────────────────────────────────────────────────┘
```

### Workflow File

`.github/workflows/ci-cd.yml`:

```yaml
name: Smart Task Manager CI/CD

on:
  push:
    branches: ["main", "develop"]
  pull_request:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  security-events: write
  actions: read

jobs:
  code-quality:
    name: Code Quality & Security Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
      - name: Run Tests
        run: |
          for service in auth-service task-service board-service; do
            (cd "$service" && npm ci && npm test)
          done
      - name: Trivy Scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'image'
          severity: 'CRITICAL,HIGH'
      - name: CodeQL Analysis
        uses: github/codeql-action/analyze@v3
```

---

## 🔒 Security

### Security Features

- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **CORS Protection** - Configured cross-origin policies
- ✅ **Environment Variables** - No hardcoded secrets
- ✅ **Kubernetes Secrets** - Base64 encoded sensitive data
- ✅ **Container Scanning** - Trivy for vulnerabilities
- ✅ **Static Analysis** - CodeQL for code security
- ✅ **HTTPS Support** - Via ngrok and ingress TLS (optional)

### Security Scanning

#### Trivy (Container Vulnerabilities)
```bash
# Scan a Docker image
trivy image auth-service:latest

# Scan with SARIF output
trivy image --format sarif --output trivy-results.sarif auth-service:latest
```

#### CodeQL (Static Analysis)
Automatically runs on every push to main/develop branches via GitHub Actions.

### Secrets Management

**Kubernetes Secrets:**
```bash
# Create secret from literal values
kubectl create secret generic smart-secrets \
  --from-literal=JWT_SECRET=your-secret-key \
  --from-literal=MONGO_URI=mongodb://mongo:27017/taskmanager

# Or apply from YAML
kubectl apply -f k8s/secrets.yaml
```

**ConfigMaps:**
```bash
kubectl apply -f k8s/mongo-config.yaml
```

---

## 🧪 Testing

### Unit Tests

Each service has its own test suite:

```bash
# Auth Service
cd auth-service
npm test

# Task Service
cd task-service
npm test

# Board Service
cd board-service
npm test

# Frontend
cd frontend
npm test
```

### Integration Testing

Use the provided test script:

```bash
chmod +x scripts/test-endpoints.sh
./scripts/test-endpoints.sh
```

### Manual API Testing

```bash
# Register a user
curl -X POST http://localhost:9090/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","username":"testuser","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:9090/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Create a task (use token from login)
curl -X POST http://localhost:9090/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"title":"Test Task","description":"Test Description","status":"todo"}'
```

---

## 📊 Monitoring & Troubleshooting

### Check Pod Status
```bash
kubectl get pods -n default
kubectl describe pod <pod-name> -n default
kubectl logs <pod-name> -n default
kubectl logs <pod-name> -n default --previous  # Previous crashed pod logs
```

### Check Services
```bash
kubectl get svc -n default
kubectl describe svc <service-name> -n default
```

### Check Ingress
```bash
kubectl get ingress -n default
kubectl describe ingress smart-ingress -n default
```

### Common Issues

**Issue: Pods in ImagePullBackOff**
```bash
# Solution: Load images into minikube
minikube image load auth-service:latest
minikube image load task-service:latest
minikube image load board-service:latest
```

**Issue: CrashLoopBackOff**
```bash
# Check pod logs
kubectl logs <pod-name> -n default

# Common causes:
# 1. MongoDB not ready - wait for mongo pod to be Running
# 2. Wrong environment variables - check secrets and configmaps
# 3. Port conflicts - ensure ports are not already in use
```

**Issue: Ingress not accessible**
```bash
# Ensure ingress addon is enabled
minikube addons enable ingress

# Check ingress controller
kubectl get pods -n ingress-nginx

# Start minikube tunnel
minikube tunnel
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm test
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Code Style

- Use ESLint for JavaScript/TypeScript
- Follow REST API best practices
- Write meaningful commit messages
- Add tests for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Pujan Mevawala**

- GitHub: [@PujanMevawala](https://github.com/PujanMevawala)
- Repository: [smart-task-manager](https://github.com/PujanMevawala/smart-task-manager)

---

## 📚 Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Terraform Documentation](https://www.terraform.io/docs)
- [React Documentation](https://reactjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## 🎯 Project Evaluation

This project achieved a **perfect score of 20/20** across all evaluation metrics:

| Metric | Score | Status |
|--------|-------|--------|
| Microservices Architecture | 2.5/2.5 | ✅ |
| Docker Containerization | 4.0/4.0 | ✅ |
| CI/CD Pipeline | 2.5/2.5 | ✅ |
| Kubernetes Orchestration | 2.5/2.5 | ✅ |
| Infrastructure as Code | 2.5/2.5 | ✅ |
| DevSecOps Practices | 2.0/2.0 | ✅ |
| Cloud/Local Deployment | 2.0/2.0 | ✅ |
| Public Link Accessibility | 2.0/2.0 | ✅ |

See [DEPLOYMENT_EVALUATION_REPORT.md](DEPLOYMENT_EVALUATION_REPORT.md) for detailed evaluation.

---

<div align="center">

**Made with by Pujan Mevawala**

**Star this repository if you found it helpful!**

</div>
