#!/bin/bash
###############################################################################
# Build Docker Images Script
# Builds all microservice images with proper tagging
###############################################################################

set -e

echo "🐳 Building Docker Images for Smart Task Manager"
echo "================================================"

# Configuration
DOCKER_REGISTRY="${DOCKER_REGISTRY:-}"
VERSION="${VERSION:-latest}"

# Function to build an image
build_image() {
    local service=$1
    local port=$2
    
    echo ""
    echo "📦 Building $service..."
    
    if [ -n "$DOCKER_REGISTRY" ]; then
        IMAGE_NAME="$DOCKER_REGISTRY/$service:$VERSION"
    else
        IMAGE_NAME="$service:$VERSION"
    fi
    
    docker build \
        --build-arg NODE_ENV=production \
        -t "$IMAGE_NAME" \
        -t "$service:latest" \
        "./$service"
    
    echo "✅ Built: $IMAGE_NAME"
}

# Build all services
build_image "auth-service" "8000"
build_image "task-service" "5001"
build_image "board-service" "8002"

echo ""
echo "🎉 All images built successfully!"
echo ""
echo "📋 Built images:"
docker images | grep -E "auth-service|task-service|board-service" | head -6

# If using Minikube, load images
if command -v minikube &> /dev/null && minikube status &> /dev/null; then
    echo ""
    read -p "Load images into Minikube? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📤 Loading images into Minikube..."
        minikube image load auth-service:latest
        minikube image load task-service:latest
        minikube image load board-service:latest
        echo "✅ Images loaded into Minikube"
    fi
fi

echo ""
echo "✅ Build complete!"
