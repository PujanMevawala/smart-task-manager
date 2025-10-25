# 🚀 Quick Testing Guide - START HERE!

## ✅ All Services Are Running!

Your application is **LIVE and READY** for testing!

## 🌐 Access URLs

**Use these URLs to access your application:**

| Purpose | URL |
|---------|-----|
| **Main Application (Public)** | https://ulrike-comfier-precontemporaneously.ngrok-free.dev |
| **Main Application (Local)** | http://localhost:9090 |
| **Frontend Direct** | http://localhost:3000 |

## 📱 Step-by-Step Browser Testing

### 1️⃣ Open Your Application

```
Open browser and go to:
https://ulrike-comfier-precontemporaneously.ngrok-free.dev

OR

http://localhost:9090
```

### 2️⃣ Register a New User

1. Click **"Register"** button in the header
2. Fill in the form:
   - **Name**: `Test User`
   - **Email**: `test@example.com`
   - **Password**: `password123`
   - **Confirm Password**: `password123`
3. Click **"Register"** button
4. You'll be automatically redirected to the Dashboard ✅

### 3️⃣ Verify in MongoDB Compass

**Connect to MongoDB:**
```
1. Open MongoDB Compass
2. Connection String: mongodb://localhost:27017
3. Click "Connect"

4. Navigate to:
   Database: smart-task-manager
   Collection: users

5. You should see your user:
   {
     "_id": ObjectId("..."),
     "name": "Test User",
     "email": "test@example.com",
     "password": "<hashed_password>",
     "createdAt": "2025-10-25T...",
     "updatedAt": "2025-10-25T..."
   }
```

### 4️⃣ Create a Task

1. Click **"Tasks"** in the navigation
2. Click **"+ New Task"** button
3. Fill in:
   - **Title**: `Buy groceries`
   - **Description**: `Milk, bread, eggs, cheese`
   - **Status**: `To Do`
4. Click **"Create Task"**
5. Task appears in the "To Do" column ✅

### 5️⃣ Verify Task in Database

**In MongoDB Compass:**
```
1. Navigate to:
   Database: smart-task-manager
   Collection: tasks

2. Click refresh button

3. You should see your task:
   {
     "_id": ObjectId("..."),
     "title": "Buy groceries",
     "description": "Milk, bread, eggs, cheese",
     "status": "todo",
     "user": ObjectId("..."),  ← Your user ID
     "createdAt": "2025-10-25T...",
     "updatedAt": "2025-10-25T..."
   }
```

### 6️⃣ Update Task Status

1. Click the **edit (✏️)** button on your task
2. Change **Status** to: `In Progress`
3. Click **"Update Task"**
4. Task moves to "In Progress" column ✅

**Verify in MongoDB Compass:**
- Refresh the tasks collection
- Find your task
- Status should now be: `"in-progress"`
- `updatedAt` timestamp should be newer

### 7️⃣ Complete the Task

1. Click **edit (✏️)** again
2. Change **Status** to: `Done`
3. Click **"Update Task"**
4. Task moves to "Done" column ✅

**Verify in MongoDB Compass:**
- Status should now be: `"done"`

### 8️⃣ Create a Board

1. Click **"Boards"** in navigation
2. Click **"+ New Board"**
3. Fill in:
   - **Board Name**: `Personal Tasks`
   - **Description**: `My personal to-do list`
4. Click **"Create Board"**
5. Board appears in the grid ✅

**Verify in MongoDB Compass:**
```
Navigate to:
Database: smart-task-manager
Collection: boards

New document should appear:
{
  "_id": ObjectId("..."),
  "name": "Personal Tasks",
  "description": "My personal to-do list",
  "user": ObjectId("..."),
  "createdAt": "2025-10-25T...",
  "updatedAt": "2025-10-25T..."
}
```

### 9️⃣ Check Dashboard Statistics

1. Click **"Dashboard"** in navigation
2. You should see:
   - **To Do**: count of tasks with status "todo"
   - **In Progress**: count of tasks with status "in-progress"
   - **Done**: count of tasks with status "done"
   - **Recent Tasks**: Your latest tasks

### 🔟 Test Logout

1. Click your **username** in the header
2. Click **"Logout"**
3. You're redirected to Login page ✅
4. Token is removed from browser storage

**Verify:**
- Open DevTools (F12)
- Go to: Application → Local Storage
- Token should be gone

## 🔍 Browser DevTools Testing

### Check Network Requests

1. **Open DevTools**: Press `F12` or `Cmd+Option+I` (Mac)
2. **Go to Network Tab**
3. **Perform actions** (create task, login, etc.)
4. **Watch the requests**:

```
Expected Requests:

POST /api/auth/register
├── Status: 201 Created
└── Response: { token: "...", user: {...} }

POST /api/auth/login
├── Status: 200 OK
└── Response: { token: "...", user: {...} }

GET /api/tasks
├── Status: 200 OK
├── Headers: Authorization: Bearer <token>
└── Response: [{ _id, title, description, ... }]

POST /api/tasks
├── Status: 201 Created
├── Headers: Authorization: Bearer <token>
└── Response: { _id, title, description, ... }

PUT /api/tasks/:id
├── Status: 200 OK
└── Updated task data

DELETE /api/tasks/:id
└── Status: 200 OK
```

### Check Token Storage

1. **Open DevTools**: `F12`
2. **Go to Application Tab**
3. **Expand Local Storage**
4. **Click on your domain**
5. **Look for key**: `token`
6. **Value**: Should be JWT token (starts with `eyJ...`)

### Check Console for Errors

1. **Open DevTools**: `F12`
2. **Go to Console Tab**
3. **Should be clean** - no red errors
4. If you see errors, note them for debugging

## 🧪 Quick API Test with cURL

Test backend APIs directly:

```bash
# 1. Test Health
curl https://ulrike-comfier-precontemporaneously.ngrok-free.dev/health

# Expected: "Smart Task Manager - All services running"

# 2. Register User
curl -X POST https://ulrike-comfier-precontemporaneously.ngrok-free.dev/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CLI Test User",
    "email": "cli@test.com",
    "password": "password123"
  }'

# Expected: { "token": "...", "user": {...} }

# 3. Login
curl -X POST https://ulrike-comfier-precontemporaneously.ngrok-free.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cli@test.com",
    "password": "password123"
  }'

# Save the token from response

# 4. Get Tasks (replace YOUR_TOKEN_HERE)
curl https://ulrike-comfier-precontemporaneously.ngrok-free.dev/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📊 Complete Test Checklist

Quick checklist to verify everything works:

```
Frontend:
✅ Can access application in browser
✅ Registration form works
✅ Login form works
✅ Dashboard displays after login
✅ Tasks page shows Kanban board
✅ Can create new task
✅ Task appears in correct column
✅ Can edit task
✅ Can change task status
✅ Can delete task
✅ Boards page works
✅ Can create board
✅ Can edit board
✅ Can delete board
✅ Dashboard shows correct statistics
✅ Logout works

Backend & Database:
✅ User saved in MongoDB (users collection)
✅ Tasks saved in MongoDB (tasks collection)
✅ Boards saved in MongoDB (boards collection)
✅ Updates reflect in database
✅ Deletions remove from database
✅ JWT token generated on login
✅ API requests include Authorization header
✅ Protected routes require authentication

Integration:
✅ Frontend → Backend communication works
✅ Backend → Database writes work
✅ Database → Backend reads work
✅ All features work via public URL
✅ No CORS errors
✅ No console errors
```

## 🎥 What to Look For

### In Browser:
- ✅ Smooth page transitions
- ✅ Forms submit correctly
- ✅ Data displays immediately after creation
- ✅ Updates happen in real-time
- ✅ Error messages if something fails
- ✅ Loading states during API calls

### In MongoDB Compass:
- ✅ Documents appear after creation
- ✅ Documents update when edited
- ✅ Documents disappear when deleted
- ✅ User ObjectId references are correct
- ✅ Timestamps are accurate
- ✅ Passwords are hashed (not plain text)

### In DevTools Network:
- ✅ Status codes: 200 OK, 201 Created
- ✅ Authorization headers present
- ✅ Request/Response data is correct
- ✅ No 401 (unauthorized) errors
- ✅ No 404 (not found) errors
- ✅ No 500 (server) errors

## 🐛 Common Issues

### "Not authorized, no token"
**Solution**: Login again. Token may have expired.

### Task not appearing
**Solution**: 
1. Check Network tab for errors
2. Refresh page
3. Check MongoDB Compass - is it in DB?

### Cannot connect to MongoDB Compass
**Solution**:
```bash
# Make sure MongoDB port is accessible
kubectl port-forward svc/mongo-service 27017:27017 &
```

### Frontend shows blank page
**Solution**:
1. Check browser console for errors
2. Verify frontend is running: `lsof -i:3000`
3. Clear browser cache

## 📸 Screenshot Ideas

Take screenshots of:
1. Registration form filled out
2. Dashboard after login
3. Tasks Kanban board with tasks
4. MongoDB Compass showing user document
5. MongoDB Compass showing task document
6. DevTools Network tab with API calls
7. DevTools Application tab with token

## 🎉 Success!

If you can:
1. ✅ Register a user
2. ✅ See user in MongoDB
3. ✅ Login
4. ✅ Create a task
5. ✅ See task in UI and MongoDB
6. ✅ Update task
7. ✅ See update in both places

**Then your full-stack application is working perfectly!** 🚀

---

**For detailed testing instructions, see: `TESTING_GUIDE.md`**

**Your Public URL**: https://ulrike-comfier-precontemporaneously.ngrok-free.dev

**MongoDB Connection**: mongodb://localhost:27017

**Happy Testing!** 🎊
