### Multi-stage Dockerfile for auth-service
# Stage 1: install dependencies and build (if needed)
FROM node:18-alpine AS build
WORKDIR /app
ENV NODE_ENV=production

# Install build dependencies
COPY package*.json ./
RUN npm ci --production

# Copy source
COPY . .

# Stage 2: final minimal image
FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only production files from build stage
COPY --from=build /app /app

USER appuser
EXPOSE 8000
CMD ["node", "src/server.js"]
