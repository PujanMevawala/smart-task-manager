#!/bin/bash
###############################################################################
# Ngrok Tunnel Setup Script for Smart Task Manager
# Exposes local Kubernetes ingress to public internet for testing/demo
###############################################################################

set -e

echo "🚀 Smart Task Manager - Public Access Setup"
echo "==========================================="

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok is not installed"
    echo "📥 Install ngrok:"
    echo "   macOS: brew install ngrok/ngrok/ngrok"
    echo "   Linux: snap install ngrok"
    echo "   Or visit: https://ngrok.com/download"
    exit 1
fi

# Check if minikube tunnel is running
if ! pgrep -f "minikube tunnel" > /dev/null; then
    echo "⚠️  Minikube tunnel not detected"
    echo "💡 Run in another terminal: sudo minikube tunnel"
    read -p "Press Enter when tunnel is ready..."
fi

# Get ngrok auth token from environment or prompt
if [ -z "$NGROK_AUTHTOKEN" ]; then
    echo "⚠️  NGROK_AUTHTOKEN not set"
    echo "Get your token from: https://dashboard.ngrok.com/get-started/your-authtoken"
    read -p "Enter ngrok authtoken: " NGROK_AUTHTOKEN
    ngrok authtoken "$NGROK_AUTHTOKEN"
fi

echo ""
echo "🌐 Starting ngrok tunnel on port 80..."
echo "📊 Dashboard will be available at: http://localhost:4040"
echo ""
echo "✅ Your application will be accessible at the public URL shown below"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Start ngrok in background and capture URL
ngrok http 80 --log=stdout > /tmp/ngrok.log &
NGROK_PID=$!

# Wait for ngrok to start
sleep 3

# Get public URL
PUBLIC_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"[^"]*' | grep -o 'https://[^"]*' | head -1)

if [ -n "$PUBLIC_URL" ]; then
    echo ""
    echo "🎉 PUBLIC URL: $PUBLIC_URL"
    echo ""
    echo "🔗 Test endpoints:"
    echo "   Auth Service:  $PUBLIC_URL/api/auth"
    echo "   Task Service:  $PUBLIC_URL/api/tasks"
    echo "   Board Service: $PUBLIC_URL/api/boards"
    echo ""
    echo "📋 Sample cURL commands:"
    echo ""
    echo "# Register user:"
    echo "curl -X POST $PUBLIC_URL/api/auth/register \\"
    echo "  -H 'Content-Type: application/json' \\"
    echo "  -d '{\"name\":\"demo\",\"email\":\"demo@test.com\",\"password\":\"pass123\"}'"
    echo ""
    echo "Press Ctrl+C to stop ngrok tunnel"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Save URL to file for CI/CD
    echo "$PUBLIC_URL" > .ngrok_url
    
    # Keep running
    wait $NGROK_PID
else
    echo "❌ Failed to get ngrok public URL"
    echo "Check logs at /tmp/ngrok.log"
    kill $NGROK_PID 2>/dev/null || true
    exit 1
fi
