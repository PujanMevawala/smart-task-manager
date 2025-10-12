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

### Board Service (http://localhost:8002)

- **POST /api/boards**
  - Create a new board
  ```bash
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your-token>" -d '{"name": "Test Board", "description": "Test Board Description"}' http://localhost:8002/api/boards
  ```

- **GET /api/boards**
  - Get all boards
  ```bash
  curl -H "Authorization: Bearer <your-token>" http://localhost:8002/api/boards
  ```

## Monitoring and Debugging

1. View service logs:
```bash
# Auth Service logs
kubectl logs -l app=auth-service

# Board Service logs
kubectl logs -l app=board-service

# Task Service logs
kubectl logs -l app=task-service
```

2. Check service status:
```bash
kubectl get svc
```

3. Check ingress status:
```bash
kubectl get ingress
```

## Cleanup

To clean up all resources:
```bash
kubectl delete -f k8s/
minikube stop
```

## Environment Variables

The following environment variables are required for each service:

- **MONGO_URI**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT token generation/validation

These are configured in the Kubernetes secrets and automatically injected into the services.

## Security

- JWT-based authentication
- Protected routes using middleware
- Secure password hashing
- Environment variables for sensitive data

## Known Issues and Solutions

1. If services can't connect to MongoDB, check if the MongoDB pod is running and the config is correct:
```bash
kubectl get pods
kubectl describe configmap mongo-config
```

2. If authentication fails between services, verify the JWT_SECRET is consistent:
```bash
kubectl describe secret smart-secrets
```

3. If ingress is not working, verify the ingress controller is running:
```bash
kubectl get pods -n ingress-nginx
```