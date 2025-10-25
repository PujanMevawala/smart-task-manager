# Frontend Deployment Guide

Complete guide for deploying the Smart Task Manager frontend.

## Quick Start

```bash
# 1. Install dependencies
cd frontend && npm install

# 2. Start development server
npm start

# 3. Access at http://localhost:3000
```

## Development Deployment

### Prerequisites

- Backend services running (port forwards: 8000, 5001, 8002)
- Nginx proxy running on port 9090
- Node.js 18+ installed

### Steps

1. **Start Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

2. **Restart Nginx Proxy**
   ```bash
   # Stop existing nginx
   pkill -f "nginx.*9090"
   
   # Start with updated config
   cd ..
   nginx -c $(pwd)/nginx-proxy.conf
   ```

3. **Verify**
   ```bash
   # Check frontend
   curl http://localhost:3000
   
   # Check via proxy
   curl http://localhost:9090
   
   # Check public URL
   curl https://<your-ngrok-url>.ngrok-free.dev
   ```

## Production Deployment (Kubernetes)

### 1. Build Docker Image

```bash
# Build frontend image
cd frontend
docker build -t smart-task-manager-frontend:latest .

# Verify image
docker images | grep frontend
```

### 2. Load into Minikube

```bash
# Load image
minikube image load smart-task-manager-frontend:latest

# Verify
minikube image ls | grep frontend
```

### 3. Deploy to Kubernetes

```bash
# Apply deployments
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

# Update ingress
kubectl apply -f k8s/ingress.yaml

# Verify deployment
kubectl get pods -l app=frontend
kubectl get svc frontend-service
```

### 4. Port Forward

```bash
# Forward frontend service
kubectl port-forward svc/frontend-service 3000:3000 &

# Verify
curl http://localhost:3000
```

### 5. Update Nginx Proxy

The nginx proxy should already be configured to route:
- `/` -> Frontend (localhost:3000)
- `/api/auth` -> Auth service (localhost:8000)
- `/api/tasks` -> Task service (localhost:5001)
- `/api/boards` -> Board service (localhost:8002)

### 6. Restart Ngrok

```bash
# Ensure ngrok is running on port 9090
./start-ngrok.sh
```

## Environment-Specific Configuration

### Development

**package.json**
```json
{
  "proxy": "http://localhost:9090"
}
```

### Production (Kubernetes)

**nginx.conf** (in frontend directory)
- Serves built files from `/usr/share/nginx/html`
- Handles client-side routing
- Gzip compression enabled
- Security headers set

**Dockerfile**
- Multi-stage build
- Stage 1: Build React app
- Stage 2: Serve with Nginx

## Complete Deployment Checklist

- [ ] Backend services running (4 pods)
- [ ] Port forwards active (auth, task, board)
- [ ] Frontend dependencies installed
- [ ] Frontend running on port 3000
- [ ] Nginx proxy updated with frontend route
- [ ] Nginx running on port 9090
- [ ] Ngrok tunnel active
- [ ] Public URL accessible
- [ ] Can register new user
- [ ] Can login
- [ ] Can create tasks
- [ ] Can create boards
- [ ] Dashboard shows statistics

## Verification Commands

```bash
# Check all services
kubectl get pods
kubectl get svc

# Check port forwards
lsof -i:8000  # auth-service
lsof -i:5001  # task-service
lsof -i:8002  # board-service
lsof -i:3000  # frontend

# Check nginx
lsof -i:9090

# Check ngrok
curl https://<your-ngrok-url>.ngrok-free.dev/health
```

## Troubleshooting

### Frontend not loading

```bash
# Check if React dev server is running
lsof -i:3000

# Check logs
cd frontend
npm start
```

### API calls failing

```bash
# Check nginx proxy config
cat nginx-proxy.conf | grep -A 5 "location /"

# Check port forwards
kubectl get pods
lsof -i:8000 -i:5001 -i:8002

# Restart nginx
pkill -f "nginx.*9090"
nginx -c $(pwd)/nginx-proxy.conf
```

### 401 Unauthorized errors

1. Clear browser localStorage
2. Register new user
3. Check JWT token in browser DevTools -> Application -> Local Storage

### Public URL not working

```bash
# Check ngrok status
curl http://localhost:4040/api/tunnels

# Restart ngrok
pkill ngrok
./start-ngrok.sh
```

## Architecture

```
User Browser
    ↓
Ngrok (Public URL)
    ↓
Nginx Proxy (Port 9090)
    ├─→ Frontend (Port 3000) - React App
    ├─→ /api/auth → Auth Service (Port 8000)
    ├─→ /api/tasks → Task Service (Port 5001)
    └─→ /api/boards → Board Service (Port 8002)
```

## URLs

| Service | Local | Via Proxy | Public (Ngrok) |
|---------|-------|-----------|----------------|
| Frontend | http://localhost:3000 | http://localhost:9090 | https://<url>.ngrok-free.dev |
| Auth API | http://localhost:8000 | http://localhost:9090/api/auth | https://<url>.ngrok-free.dev/api/auth |
| Task API | http://localhost:5001 | http://localhost:9090/api/tasks | https://<url>.ngrok-free.dev/api/tasks |
| Board API | http://localhost:8002 | http://localhost:9090/api/boards | https://<url>.ngrok-free.dev/api/boards |

## Performance Tips

### Development
- Use React DevTools for debugging
- Enable React Profiler for performance analysis
- Use browser DevTools Network tab to debug API calls

### Production
- Build optimized bundle: `npm run build`
- Verify bundle size: `du -sh build/`
- Test gzip compression
- Check Lighthouse scores

## Security Considerations

1. **JWT Tokens** - Stored in localStorage, included in all API requests
2. **Protected Routes** - Unauthorized users redirected to login
3. **CORS** - Backend allows requests from frontend domain
4. **HTTPS** - Use ngrok for secure public access
5. **Headers** - Nginx sets security headers (X-Frame-Options, etc.)

## Next Steps

1. ✅ Frontend deployed and accessible
2. ⏭️ Add error boundary for better error handling
3. ⏭️ Implement toast notifications
4. ⏭️ Add loading skeletons
5. ⏭️ Enhance mobile responsiveness
6. ⏭️ Add user profile management
7. ⏭️ Implement task filtering and search
8. ⏭️ Add drag-and-drop for tasks
9. ⏭️ Create CI/CD pipeline for frontend
10. ⏭️ Add E2E tests with Cypress

## Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
