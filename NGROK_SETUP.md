# Ngrok Public Access Setup Guide

## Quick Setup (3 Steps)

### Step 1: Get Your Ngrok Auth Token

1. Visit: https://dashboard.ngrok.com/get-started/your-authtoken
2. Sign up for a free account if you don't have one
3. Copy your authtoken

### Step 2: Configure Ngrok

Run this command with your authtoken:

```bash
ngrok authtoken YOUR_AUTHTOKEN_HERE
```

### Step 3: Start Public Tunnel

Choose one of these methods:

#### Method A: Direct Service Tunnel (Simplest)

```bash
# Start port forwarding first
kubectl port-forward -n default svc/auth-service 8000:80 &
kubectl port-forward -n default svc/task-service 5001:80 &
kubectl port-forward -n default svc/board-service 8002:80 &

# Then start ngrok on auth service
ngrok http 8000
```

#### Method B: Using the Automation Script

```bash
./scripts/setup-ngrok.sh
```

## Testing Your Public URL

Once ngrok is running, you'll see output like:

```
Forwarding  https://xxxx-xx-xx-xx.ngrok-free.app -> http://localhost:8000
```

### Test Endpoints:

1. **Auth Service Health Check**

```bash
curl https://YOUR-NGROK-URL.ngrok-free.app/api/auth/
```

2. **Register User**

```bash
curl -X POST https://YOUR-NGROK-URL.ngrok-free.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

3. **Login**

```bash
curl -X POST https://YOUR-NGROK-URL.ngrok-free.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

4. **Create Task** (with JWT token from login)

```bash
curl -X POST https://YOUR-NGROK-URL.ngrok-free.app/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Task","description":"From public URL","status":"todo"}'
```

## Ngrok Dashboard

Access the ngrok web interface at: http://localhost:4040

- See all HTTP requests
- Inspect request/response details
- Replay requests

## Stopping the Tunnel

Press `Ctrl+C` in the terminal where ngrok is running

## Troubleshooting

### Error: "authentication failed"

- Run: `ngrok authtoken YOUR_TOKEN`
- Get token from: https://dashboard.ngrok.com/get-started/your-authtoken

### Error: "connection refused"

- Verify port forwarding is active: `ps aux | grep kubectl`
- Check service status: `kubectl get svc -n default`
- Test locally first: `curl http://localhost:8000/api/auth/`

### Port already in use

- Kill existing processes: `pkill -f "kubectl port-forward"`
- Wait 5 seconds and try again

## Note for Free Accounts

- Ngrok free tier includes:
  - 1 online ngrok process
  - 4 tunnels per ngrok process
  - 40 connections/minute
  - Random URLs (changes each restart)
- For static URLs, upgrade to paid plan

## Alternative: Expose All Services

If you need all three services accessible:

```bash
# Terminal 1: Auth Service
kubectl port-forward -n default svc/auth-service 8000:80 &
ngrok http 8000

# Terminal 2: Task Service
kubectl port-forward -n default svc/task-service 5001:80 &
ngrok http 5001

# Terminal 3: Board Service
kubectl port-forward -n default svc/board-service 8002:80 &
ngrok http 8002
```

(Requires ngrok paid account for multiple tunnels)
