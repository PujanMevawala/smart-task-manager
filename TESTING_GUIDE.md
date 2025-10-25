# 🧪 Full-Stack Testing Guide

Complete guide to test your Smart Task Manager application - Frontend, Backend, and Database integration.

## 📋 Prerequisites Checklist

Before testing, ensure all services are running:

```bash
# 1. Check Kubernetes pods
kubectl get pods
# Expected: 4 pods running (auth, task, board, mongo)

# 2. Check port forwards
lsof -i:8000  # auth-service
lsof -i:5001  # task-service
lsof -i:8002  # board-service

# 3. Check frontend
lsof -i:3000  # React dev server

# 4. Check nginx proxy
lsof -i:9090  # nginx

# 5. Check ngrok
curl http://localhost:4040/api/tunnels
```

## 🚀 Quick Start - Complete Test Flow

### Step 1: Start All Services (if not running)

```bash
# Terminal 1: Port forwards (if not already running)
kubectl port-forward svc/auth-service 8000:80 &
kubectl port-forward svc/task-service 5001:80 &
kubectl port-forward svc/board-service 8002:80 &

# Terminal 2: Start frontend
cd frontend
npm start
# Wait for "Compiled successfully!" message

# Terminal 3: Start nginx proxy
cd ..
nginx -c $(pwd)/nginx-proxy.conf

# Terminal 4: Ngrok (if not already running)
./start-ngrok.sh
```

### Step 2: Get Your URLs

```bash
# Public URL (for external access)
echo "Public URL: https://ulrike-comfier-precontemporaneously.ngrok-free.dev"

# Local URLs
echo "Frontend: http://localhost:3000"
echo "Via Proxy: http://localhost:9090"
```

## 🌐 Browser Testing - Complete User Journey

### Test 1: User Registration

1. **Open Browser**
   ```
   URL: https://ulrike-comfier-precontemporaneously.ngrok-free.dev
   or http://localhost:9090
   ```

2. **Navigate to Register**
   - Click "Register" button in header
   - Or go to: `https://<your-url>.ngrok-free.dev/register`

3. **Fill Registration Form**
   ```
   Name: Test User
   Email: test@example.com
   Password: password123
   Confirm Password: password123
   ```

4. **Submit and Verify**
   - Click "Register" button
   - Should redirect to Dashboard
   - Check header shows "Test User"

5. **Verify in MongoDB Compass**
   ```
   Connection String: mongodb://localhost:27017
   
   Steps:
   1. Open MongoDB Compass
   2. Connect to: mongodb://localhost:27017
   3. Navigate to database: smart-task-manager
   4. Open collection: users
   5. You should see your new user:
      {
        "_id": ObjectId("..."),
        "name": "Test User",
        "email": "test@example.com",
        "password": "<hashed>",
        "createdAt": ISODate("..."),
        "updatedAt": ISODate("...")
      }
   ```

6. **Verify Token Storage**
   - Open Browser DevTools (F12)
   - Go to Application tab → Local Storage
   - Check for key: `token`
   - Value should be a JWT token (starts with "eyJ...")

### Test 2: User Login (Existing User)

1. **Logout First**
   - Click user menu in header
   - Click "Logout"
   - Should redirect to Login page
   - Token removed from localStorage

2. **Login**
   ```
   URL: https://<your-url>.ngrok-free.dev/login
   
   Email: test@example.com
   Password: password123
   ```

3. **Verify**
   - Click "Login"
   - Redirects to Dashboard
   - Token stored in localStorage
   - Header shows username

### Test 3: Create Task (Frontend → Backend → Database)

1. **Navigate to Tasks**
   - Click "Tasks" in navigation
   - Or go to: `https://<your-url>.ngrok-free.dev/tasks`

2. **Create New Task**
   - Click "+ New Task" button
   - Fill form:
     ```
     Title: Buy groceries
     Description: Milk, bread, eggs, cheese
     Status: To Do
     ```
   - Click "Create Task"
   - Modal closes
   - Task appears in "To Do" column

3. **Verify in Browser**
   - Open DevTools → Network tab
   - Check POST request to `/api/tasks`
   - Status: 201 Created
   - Response should contain task data with `_id`

4. **Verify in MongoDB Compass**
   ```
   Database: smart-task-manager
   Collection: tasks
   
   Should see new document:
   {
     "_id": ObjectId("..."),
     "title": "Buy groceries",
     "description": "Milk, bread, eggs, cheese",
     "status": "todo",
     "user": ObjectId("..."),  // Your user ID
     "createdAt": ISODate("..."),
     "updatedAt": ISODate("...")
   }
   ```

5. **Verify API Call in Terminal**
   ```bash
   # Check auth-service logs
   kubectl logs -f deployment/auth-service
   
   # Check task-service logs
   kubectl logs -f deployment/task-service
   ```

### Test 4: Update Task (Edit)

1. **Edit Task**
   - Click edit (✏️) icon on task card
   - Change:
     ```
     Title: Buy groceries and fruits
     Description: Milk, bread, eggs, cheese, apples, bananas
     Status: In Progress
     ```
   - Click "Update Task"

2. **Verify in Browser**
   - Task moves to "In Progress" column
   - Title and description updated
   - Network tab shows PUT request to `/api/tasks/:id`

3. **Verify in MongoDB Compass**
   - Click refresh on tasks collection
   - Find your task by `_id`
   - Check fields are updated:
     ```
     title: "Buy groceries and fruits"
     description: "Milk, bread, eggs, cheese, apples, bananas"
     status: "in-progress"
     updatedAt: <new timestamp>
     ```

### Test 5: Complete Task (Status Change)

1. **Edit Task Again**
   - Click edit (✏️) icon
   - Change Status to: Done
   - Click "Update Task"

2. **Verify**
   - Task moves to "Done" column
   - Status in DB changes to "done"

### Test 6: Delete Task

1. **Delete Task**
   - Click delete (🗑️) icon on task
   - Confirm deletion in popup
   - Task disappears from UI

2. **Verify in MongoDB Compass**
   - Refresh tasks collection
   - Task should be removed
   - Document no longer exists

### Test 7: Create Board

1. **Navigate to Boards**
   - Click "Boards" in navigation
   - Or go to: `https://<your-url>.ngrok-free.dev/boards`

2. **Create Board**
   - Click "+ New Board" button
   - Fill form:
     ```
     Board Name: Work Projects
     Description: All work-related tasks and projects
     ```
   - Click "Create Board"

3. **Verify in Browser**
   - Board appears in grid
   - Shows creation date
   - Network tab shows POST to `/api/boards`

4. **Verify in MongoDB Compass**
   ```
   Database: smart-task-manager
   Collection: boards
   
   New document:
   {
     "_id": ObjectId("..."),
     "name": "Work Projects",
     "description": "All work-related tasks and projects",
     "user": ObjectId("..."),
     "createdAt": ISODate("..."),
     "updatedAt": ISODate("...")
   }
   ```

### Test 8: Dashboard Statistics

1. **Create Multiple Tasks**
   - Go to Tasks page
   - Create 3 tasks:
     - Task 1: Status = Todo
     - Task 2: Status = In Progress
     - Task 3: Status = Done

2. **Check Dashboard**
   - Navigate to Dashboard
   - Verify statistics:
     - Todo: 1
     - In Progress: 1
     - Done: 1
   - Recent tasks section shows latest 5 tasks

3. **Verify Data Flow**
   - DevTools → Network tab
   - Should see GET request to `/api/tasks`
   - Response contains all tasks
   - Frontend counts by status

## 🔍 MongoDB Compass - Detailed Inspection

### Connection Setup

```bash
# Get MongoDB port (if needed)
kubectl port-forward svc/mongo-service 27017:27017 &

# Connection String
mongodb://localhost:27017
```

### Database Structure

```
smart-task-manager/
├── users
│   ├── name (String)
│   ├── email (String, unique)
│   ├── password (String, hashed)
│   ├── createdAt (Date)
│   └── updatedAt (Date)
├── tasks
│   ├── title (String)
│   ├── description (String)
│   ├── status (String: "todo" | "in-progress" | "done")
│   ├── user (ObjectId, ref: users)
│   ├── createdAt (Date)
│   └── updatedAt (Date)
└── boards
    ├── name (String)
    ├── description (String)
    ├── user (ObjectId, ref: users)
    ├── createdAt (Date)
    └── updatedAt (Date)
```

### Queries to Run in Compass

1. **Find User by Email**
   ```javascript
   { "email": "test@example.com" }
   ```

2. **Find All Tasks for User**
   ```javascript
   { "user": ObjectId("your-user-id-here") }
   ```

3. **Find Tasks by Status**
   ```javascript
   { "status": "todo" }
   { "status": "in-progress" }
   { "status": "done" }
   ```

4. **Find Recent Tasks (sorted)**
   ```javascript
   // Filter: {}
   // Sort: { "createdAt": -1 }
   // Limit: 5
   ```

## 🛠️ Browser DevTools Testing

### Network Tab (API Inspection)

1. **Open DevTools**
   - Press F12 or Cmd+Option+I (Mac)
   - Go to Network tab
   - Check "Preserve log"

2. **What to Look For**
   ```
   Request Examples:
   
   POST /api/auth/register
   ├── Request Headers: Content-Type: application/json
   ├── Request Payload: { name, email, password }
   ├── Response: 201 Created
   └── Response Body: { token, user }
   
   POST /api/auth/login
   ├── Request Payload: { email, password }
   ├── Response: 200 OK
   └── Response Body: { token, user }
   
   GET /api/tasks
   ├── Request Headers: Authorization: Bearer <token>
   ├── Response: 200 OK
   └── Response Body: [{ _id, title, description, status, ... }]
   
   POST /api/tasks
   ├── Headers: Authorization: Bearer <token>
   ├── Payload: { title, description, status }
   ├── Response: 201 Created
   └── Body: { _id, title, description, status, user, ... }
   
   PUT /api/tasks/:id
   ├── Headers: Authorization: Bearer <token>
   ├── Payload: { title, description, status }
   └── Response: 200 OK
   
   DELETE /api/tasks/:id
   ├── Headers: Authorization: Bearer <token>
   └── Response: 200 OK
   ```

3. **Check Request/Response**
   - Click on any request
   - View Headers tab (check Authorization header)
   - View Payload tab (data sent)
   - View Response tab (data received)

### Console Tab (Debug Logs)

1. **Check for Errors**
   ```javascript
   // Should not see any errors
   // If you see CORS errors, nginx proxy issue
   // If you see 401, token issue
   // If you see 404, route/endpoint issue
   ```

2. **Add Custom Logs** (optional)
   - Edit `src/services/api.js`
   - Uncomment console logs to see requests

### Application Tab (Storage)

1. **Local Storage**
   ```
   Key: token
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   Actions to test:
   - Login → token appears
   - Logout → token removed
   - Close/reopen browser → token persists
   ```

2. **Session Storage**
   - Not used in this app

3. **Cookies**
   - Not used for auth (using localStorage instead)

## 🧪 API Testing with cURL

### Test Backend Directly (Bypass Frontend)

```bash
# 1. Register User
curl -X POST http://localhost:9090/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test User",
    "email": "apitest@example.com",
    "password": "password123"
  }'

# Response: { "token": "...", "user": { ... } }
# Save the token for next requests

# 2. Login
curl -X POST http://localhost:9090/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "apitest@example.com",
    "password": "password123"
  }'

# 3. Get Tasks (requires token)
TOKEN="your-token-here"
curl -X GET http://localhost:9090/api/tasks \
  -H "Authorization: Bearer $TOKEN"

# 4. Create Task
curl -X POST http://localhost:9090/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "API Created Task",
    "description": "Created via cURL",
    "status": "todo"
  }'

# 5. Get Boards
curl -X GET http://localhost:9090/api/boards \
  -H "Authorization: Bearer $TOKEN"

# 6. Create Board
curl -X POST http://localhost:9090/api/boards \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "API Board",
    "description": "Created via cURL"
  }'
```

### Test Via Public URL

```bash
# Replace with your ngrok URL
PUBLIC_URL="https://ulrike-comfier-precontemporaneously.ngrok-free.dev"

# Test health
curl $PUBLIC_URL/health

# Test register
curl -X POST $PUBLIC_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Public Test","email":"public@test.com","password":"pass123"}'

# Test login
curl -X POST $PUBLIC_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"public@test.com","password":"pass123"}'
```

## 📊 Complete Test Checklist

### Frontend Tests
- [ ] Home page loads
- [ ] Register page accessible
- [ ] Login page accessible
- [ ] Register creates user
- [ ] Login authenticates user
- [ ] Dashboard displays after login
- [ ] Protected routes redirect to login when not authenticated
- [ ] Header shows user name when logged in
- [ ] Logout removes token and redirects
- [ ] Tasks page shows task board
- [ ] Create task modal opens
- [ ] Task creation works
- [ ] Task edit works
- [ ] Task delete works
- [ ] Task status change updates column
- [ ] Boards page shows boards grid
- [ ] Create board works
- [ ] Edit board works
- [ ] Delete board works
- [ ] Dashboard statistics are correct
- [ ] Recent tasks display on dashboard
- [ ] Navigation between pages works
- [ ] Responsive design works on mobile

### Backend Tests
- [ ] Auth service responding (port 8000)
- [ ] Task service responding (port 5001)
- [ ] Board service responding (port 8002)
- [ ] MongoDB accessible (port 27017)
- [ ] Register endpoint works
- [ ] Login endpoint returns token
- [ ] Token validation works
- [ ] Protected routes require auth
- [ ] Tasks CRUD operations work
- [ ] Boards CRUD operations work
- [ ] Data persists in MongoDB

### Integration Tests
- [ ] Frontend → Backend communication works
- [ ] Backend → Database writes work
- [ ] Database → Backend reads work
- [ ] Backend → Frontend responses work
- [ ] Token flow works end-to-end
- [ ] All APIs work via nginx proxy
- [ ] Public URL accessible
- [ ] CORS configured correctly
- [ ] No console errors in browser

### Database Tests
- [ ] Users collection exists
- [ ] Tasks collection exists
- [ ] Boards collection exists
- [ ] User documents have correct schema
- [ ] Task documents have correct schema
- [ ] Board documents have correct schema
- [ ] User ObjectId references work
- [ ] Passwords are hashed (not plain text)
- [ ] Timestamps auto-generated
- [ ] Data persists across restarts

## 🐛 Common Issues & Solutions

### Issue 1: "Not authorized, no token"

**Symptom**: API calls return 401

**Solution**:
1. Check if logged in (token in localStorage)
2. Clear localStorage and login again
3. Check token is being sent in requests (DevTools → Network → Headers)

### Issue 2: Tasks not appearing

**Symptom**: Create task but doesn't show in UI

**Solution**:
1. Check Network tab for errors
2. Check MongoDB Compass - is task in database?
3. Check if task belongs to correct user
4. Refresh page

### Issue 3: CORS errors

**Symptom**: "Access-Control-Allow-Origin" errors

**Solution**:
1. Ensure nginx proxy is running
2. Check frontend uses proxy (package.json)
3. Restart nginx with correct config

### Issue 4: Cannot connect to database

**Symptom**: MongoDB Compass can't connect

**Solution**:
```bash
# Check MongoDB pod
kubectl get pods | grep mongo

# Check if port 27017 forwarded
kubectl port-forward svc/mongo-service 27017:27017 &

# Try connection again
```

### Issue 5: Frontend shows blank page

**Symptom**: White screen, no content

**Solution**:
1. Check browser console for errors
2. Check if React dev server running (port 3000)
3. Check nginx proxy config
4. Clear browser cache

## 📹 Video Test Flow

Record your screen while testing to document:

1. Open browser
2. Show URL in address bar
3. Register new user
4. Show redirect to dashboard
5. Open MongoDB Compass
6. Show new user in database
7. Create task in UI
8. Show task appears in UI
9. Refresh MongoDB - show task in database
10. Update task status
11. Show update in both UI and database
12. Delete task
13. Show removal in both UI and database
14. Create board
15. Show in database
16. Show dashboard statistics
17. Show network tab with API calls
18. Show localStorage with token

## 🎯 Success Criteria

Your application is working correctly when:

1. ✅ You can register a new user
2. ✅ User appears in MongoDB users collection
3. ✅ You can login with registered user
4. ✅ JWT token stored in localStorage
5. ✅ Dashboard shows after login
6. ✅ You can create tasks
7. ✅ Tasks appear in MongoDB tasks collection
8. ✅ Tasks display in UI Kanban board
9. ✅ You can update task status
10. ✅ Updates reflect in both UI and database
11. ✅ You can delete tasks
12. ✅ Deletions remove from database
13. ✅ You can create boards
14. ✅ Boards stored in database
15. ✅ Dashboard statistics are correct
16. ✅ All features work via public ngrok URL
17. ✅ No errors in browser console
18. ✅ No errors in Kubernetes pod logs

## 📝 Testing Checklist Template

Use this for systematic testing:

```
Date: __________
Tester: __________
Environment: Local / Public URL

[ ] Services Running
    [ ] Kubernetes pods (4/4)
    [ ] Port forwards (3/3)
    [ ] Frontend (port 3000)
    [ ] Nginx (port 9090)
    [ ] Ngrok tunnel active

[ ] Registration
    [ ] Form accessible
    [ ] Validation works
    [ ] User created in DB
    [ ] Auto-login after register
    [ ] Token stored

[ ] Login
    [ ] Form accessible
    [ ] Correct credentials accepted
    [ ] Invalid credentials rejected
    [ ] Token stored
    [ ] Redirect to dashboard

[ ] Tasks
    [ ] List displays
    [ ] Create works
    [ ] Edit works
    [ ] Delete works
    [ ] Status change works
    [ ] Data persists in MongoDB

[ ] Boards
    [ ] List displays
    [ ] Create works
    [ ] Edit works
    [ ] Delete works
    [ ] Data persists in MongoDB

[ ] Dashboard
    [ ] Statistics correct
    [ ] Recent tasks show
    [ ] Quick actions work

[ ] Navigation
    [ ] All links work
    [ ] Protected routes secure
    [ ] Logout works
    [ ] Back/forward browser buttons work

Issues Found: __________
Notes: __________
```

---

**Happy Testing! 🎉**

Your full-stack application is now ready for comprehensive testing across Browser, Backend, and Database!
