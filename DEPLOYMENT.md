# Deployment Guide

This guide covers deploying the Lost & Found Item Management System to production.

## Prerequisites

- GitHub account
- MongoDB Atlas account (or other MongoDB hosting)
- Render account (for backend)
- Netlify or Render account (for frontend)

## Step 1: Prepare Your Code

### 1.1 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Lost & Found System"
git branch -M main
git remote add origin https://github.com/yourusername/lost-found-system.git
git push -u origin main
```

### 1.2 Update Environment Configuration

Make sure your backend `.env` file is properly configured for production:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lostfound
JWT_SECRET=your_super_secure_jwt_secret_key_at_least_32_characters_long
PORT=5000
```

## Step 2: Deploy Backend (Render)

### 2.1 Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier is sufficient)
4. Create a database user with password
5. Get your connection string from "Connect" → "Connect your application"
6. Add your IP address to whitelist (0.0.0.0/0 for Render)

### 2.2 Deploy Backend to Render

1. Go to [Render](https://render.com)
2. Create a new account
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:

**Basic Settings:**
- Name: `lost-found-backend`
- Region: Choose nearest to your users
- Branch: `main`

**Build Settings:**
- Build Command: `cd backend && npm install`
- Start Command: `cd backend && npm start`

**Environment Variables:**
- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Generate a secure random string (use: `openssl rand -base64 32`)
- `NODE_ENV`: `production`

6. Click "Create Web Service"

### 2.3 Verify Backend Deployment

Once deployed, your backend will be available at a URL like:
`https://lost-found-backend.onrender.com`

Test the health by visiting:
`https://lost-found-backend.onrender.com/api/items`

## Step 3: Deploy Frontend

### Option A: Deploy to Netlify (Recommended)

1. Go to [Netlify](https://netlify.com)
2. Create a new account
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:

**Build Settings:**
- Build command: `cd frontend && npm run build`
- Publish directory: `frontend/build`

**Environment Variables:**
- `REACT_APP_API_URL`: Your backend URL (e.g., `https://lost-found-backend.onrender.com`)

6. Click "Deploy site"

### Option B: Deploy to Render

1. In Render, click "New" → "Static Site"
2. Connect your GitHub repository
3. Configure:

**Basic Settings:**
- Name: `lost-found-frontend`
- Branch: `main`

**Build Settings:**
- Build Command: `cd frontend && npm run build`
- Publish Directory: `frontend/build`

**Environment Variables:**
- `REACT_APP_API_URL`: Your backend URL

4. Click "Create Static Site"

## Step 4: Configure CORS

Update your backend server to allow requests from your frontend URL:

In `backend/server.js`, update the CORS configuration:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.netlify.com',
    'https://your-frontend-url.onrender.com'
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

## Step 5: Update Frontend API Calls

If you used environment variables for the API URL, update your frontend axios calls:

In `frontend/src/pages/Login.js`, `Register.js`, and `Dashboard.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Update all axios calls to use:
axios.post(`${API_BASE_URL}/api/login`, ...)
axios.get(`${API_BASE_URL}/api/items`, config)
```

## Step 6: Test Your Deployed Application

1. Visit your frontend URL
2. Test user registration and login
3. Test adding, editing, and deleting items
4. Test search functionality
5. Test logout functionality

## Step 7: Monitor and Maintain

### Monitoring

- Check Render dashboard for backend logs
- Check Netlify dashboard for frontend deploy logs
- Monitor MongoDB Atlas for database usage

### Updates

To update your application:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update description"
   git push origin main
   ```
3. Render and Netlify will automatically deploy the changes

## Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure your frontend URL is added to CORS origins
- Check that API calls use the correct base URL

**Database Connection:**
- Verify MongoDB Atlas connection string
- Ensure IP whitelist includes Render's IP ranges
- Check database user permissions

**Build Failures:**
- Check build logs in Render/Netlify dashboards
- Ensure all dependencies are in package.json
- Verify environment variables are correctly set

**Authentication Issues:**
- Ensure JWT_SECRET is set and consistent
- Check token expiration (currently set to 1 hour)
- Verify token is being sent in headers

### Environment Variables Checklist

**Backend (.env):**
- ✅ `MONGO_URI` - MongoDB connection string
- ✅ `JWT_SECRET` - Secure random string
- ✅ `PORT` - Server port (5000)
- ✅ `NODE_ENV` - Set to 'production'

**Frontend:**
- ✅ `REACT_APP_API_URL` - Backend URL

## Security Considerations

1. **Use HTTPS:** Both Render and Netlify provide free SSL certificates
2. **Environment Variables:** Never commit secrets to Git
3. **Database Security:** Use strong passwords and limit database user permissions
4. **JWT Security:** Use a strong, randomly generated JWT secret
5. **Regular Updates:** Keep dependencies updated for security patches

## Performance Optimization

1. **Frontend:**
   - Implement code splitting with React.lazy()
   - Optimize images and assets
   - Use React.memo for expensive components

2. **Backend:**
   - Implement database indexing for search queries
   - Add rate limiting to prevent abuse
   - Use compression middleware

3. **Database:**
   - Monitor query performance
   - Add indexes on frequently queried fields
   - Consider caching for frequently accessed data

## Scaling Considerations

When your application grows:

1. **Backend:**
   - Consider moving to a paid Render plan
   - Implement load balancing
   - Add Redis for session storage

2. **Database:**
   - Upgrade MongoDB Atlas tier
   - Implement read replicas
   - Consider sharding for large datasets

3. **Frontend:**
   - Implement CDN for static assets
   - Consider server-side rendering for SEO
   - Add progressive web app features
