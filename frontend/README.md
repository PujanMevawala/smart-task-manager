# Smart Task Manager - Frontend

Modern React frontend for the Smart Task Manager application with full authentication and task management capabilities.

## Features

- 🔐 **Authentication** - Login/Register with JWT tokens
- 📋 **Task Management** - Create, update, delete, and organize tasks
- 📊 **Dashboard** - View task statistics and recent activity
- 🎯 **Boards** - Organize tasks into boards
- 🎨 **Modern UI** - Clean, responsive design with smooth animations
- 🔒 **Protected Routes** - Route-level authentication guards
- 📱 **Responsive** - Works on desktop, tablet, and mobile

## Tech Stack

- **React** 18.2.0 - UI framework
- **React Router** 6.20.0 - Client-side routing
- **Axios** 1.6.2 - HTTP client
- **CSS3** - Modern styling with CSS variables

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend services running (auth, task, board services)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Environment Variables

The frontend uses proxy configuration in `package.json` to connect to the backend:

```json
{
  "proxy": "http://localhost:9090"
}
```

For production builds, configure the API base URL in `src/services/api.js`.

## Project Structure

```
frontend/
├── public/
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # React components
│   │   ├── Header.js       # Navigation header
│   │   ├── Login.js        # Login page
│   │   ├── Register.js     # Registration page
│   │   ├── Dashboard.js    # Main dashboard
│   │   ├── Tasks.js        # Task management
│   │   ├── Boards.js       # Board management
│   │   └── PrivateRoute.js # Protected route wrapper
│   ├── context/
│   │   └── AuthContext.js  # Authentication state
│   ├── services/
│   │   ├── api.js          # Axios instance
│   │   └── taskService.js  # API service layer
│   ├── App.js              # Main app component
│   ├── App.css             # App styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── Dockerfile              # Docker configuration
├── nginx.conf              # Nginx config for production
└── package.json            # Dependencies
```

## Components

### Authentication

- **Login** - Email/password authentication
- **Register** - New user registration
- **AuthContext** - Global authentication state management

### Main Features

- **Dashboard** - Task statistics and recent tasks
- **Tasks** - Kanban-style task board (Todo, In Progress, Done)
- **Boards** - Create and manage task boards

### Shared

- **Header** - Navigation with user menu
- **PrivateRoute** - Protected route component

## API Integration

The frontend communicates with the backend through these endpoints:

```javascript
// Authentication
POST /api/auth/register
POST /api/auth/login

// Tasks
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id

// Boards
GET    /api/boards
POST   /api/boards
PUT    /api/boards/:id
DELETE /api/boards/:id
```

## Docker Deployment

### Build Docker Image

```bash
docker build -t smart-task-manager-frontend:latest .
```

### Run Container

```bash
docker run -p 80:80 smart-task-manager-frontend:latest
```

## Kubernetes Deployment

```bash
# Apply frontend deployment
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

# Verify deployment
kubectl get pods -l app=frontend
kubectl get svc frontend-service
```

## Development

### Running Locally

1. Ensure backend services are running on port 9090 (via nginx proxy)
2. Start the development server:

```bash
npm start
```

3. Open http://localhost:3000

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## Design System

The application uses a consistent design system with CSS variables:

```css
--primary-color: #4f46e5
--primary-hover: #4338ca
--success-color: #10b981
--danger-color: #ef4444
--text-primary: #1f2937
--text-secondary: #6b7280
--border-color: #e5e7eb
--light-bg: #f9fafb
```

## Authentication Flow

1. User submits login/register form
2. Frontend sends request to `/api/auth/login` or `/api/auth/register`
3. Backend returns JWT token
4. Frontend stores token in localStorage
5. Token is included in all subsequent API requests via Axios interceptor
6. If token expires (401 response), user is redirected to login

## Production Build

### Build Process

The production build uses a multi-stage Docker build:

1. **Build Stage** - Compiles React app with optimizations
2. **Production Stage** - Serves static files via Nginx

### Nginx Configuration

- Serves static files from `/usr/share/nginx/html`
- Enables gzip compression
- Handles client-side routing (SPA)
- Sets security headers
- Caches static assets (1 year)

## Contributing

1. Create feature branch from `main`
2. Make changes following code style
3. Test thoroughly
4. Submit pull request

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please create an issue in the repository.
