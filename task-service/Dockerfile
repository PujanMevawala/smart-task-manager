### Multi-stage Dockerfile for task-service
# Stage 1: dependencies
FROM node:18-alpine AS build
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --production
COPY . .

# Stage 2: runtime
FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=build /app /app
USER appuser
EXPOSE 8001
CMD ["node", "src/server.js"]
