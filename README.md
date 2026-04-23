# Lost & Found Item Management System

A complete MERN stack application for managing lost and found items with user authentication. Built for B.Tech AI308B Examination.

## 🎯 Exam Features Implemented

### ✅ Question 1: MongoDB Schema (5 Marks)
- **User Model**: Name, Email (Unique), Password (Hashed)
- **Item Model**: Item Name, Description, Category, Type (Lost/Found), Location, Date, Contact Info

### ✅ Question 2: Backend APIs (8 Marks)
- **Auth APIs**: POST /api/register, POST /api/login
- **Item APIs**: POST, GET, GET/:id, PUT, DELETE, SEARCH
- **bcrypt** for password hashing
- **JWT** for authentication

### ✅ Question 3: Frontend Development (6 Marks)
- **React App**: Registration & Login forms
- **Dashboard**: Add item, Display items, Search, Update/Delete, Logout
- **Axios** integration with backend APIs
- **JWT token** storage and auto-redirect

### ✅ Question 4: Additional Features (5 Marks)
- **Authentication middleware** protecting routes
- **Logged-in user permissions** for view/update
- **Error handling**: Invalid credentials, duplicate email, unauthorized
- **Logout functionality** (clear token & redirect)
- **Bootstrap styling** for clean UI

### ✅ Question 5: Deployment (3 Marks)
- **GitHub repository** ready
- **Render deployment** configuration

## 🚀 Tech Stack

- **MongoDB** (Mongoose) - Database
- **Express.js** - Backend Framework (MVC Architecture)
- **React.js** - Frontend Framework (.jsx files)
- **Node.js** - Runtime Environment
- **JWT** - Authentication
- **bcrypt** - Password Hashing
- **Axios** - HTTP Client
- **Bootstrap** - UI Framework

## 📁 Professional Project Structure

```
Ai-FSD/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   └── itemController.js   # CRUD operations
│   ├── middleware/
│   │   └── auth.js              # JWT middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Item.js              # Item schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── items.js             # Item routes
│   │   └── admin.js             # Admin routes
│   ├── utils/
│   │   └── errorHandler.js      # Error handling
│   ├── server.js                # Main server file
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.jsx      # Registration form
│   │   │   ├── Login.jsx         # Login form
│   │   │   └── Dashboard.jsx     # Main dashboard
│   │   ├── App.jsx               # Main app component
│   │   ├── index.jsx             # Entry point
│   │   └── index.js              # Webpack entry
│   └── package.json
├── .gitignore
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Ai-FSD
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/lostfound
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend:
```bash
npm start
```

**Application URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🌐 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Items (All Protected with JWT)
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item by ID
- `GET /api/items/search?name=xyz` - Search items by name
- `POST /api/items` - Add new item
- `PUT /api/items/:id` - Update item (owner only)
- `DELETE /api/items/:id` - Delete item (owner only)

### Admin
- `GET /api/admin/stats` - System statistics
- `GET /api/admin/users` - All users with item counts

## 📊 Data Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed with bcrypt),
  date: Date (default: current date)
}
```

### Item Model
```javascript
{
  itemName: String (required),
  description: String (required),
  category: String (required, enum: ['Electronics', 'Documents', 'Clothing', 'Accessories', 'Books', 'Keys', 'Wallet', 'Phone', 'Others']),
  type: String (required, enum: ['Lost', 'Found']),
  location: String (required),
  date: Date (required),
  contactInfo: String (required),
  user: ObjectId (ref: 'User'),
  createdAt: Date (default: current date)
}
```

## 🎮 Usage Flow

1. **Register**: Create account with name, email, password
2. **Login**: Authenticate with JWT token
3. **Dashboard**: 
   - Add lost/found items with category
   - View all items in table format
   - Search items by name
   - Edit/delete your own items only
   - Logout securely

## 🔐 Security Features

- **Password hashing** with bcrypt
- **JWT token** authentication
- **Protected routes** with middleware
- **User ownership** validation
- **Error handling** for all scenarios

## 🚀 Deployment

### Backend (Render)
```bash
# Environment Variables
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secure_secret
PORT=5000

# Build Command
cd backend && npm install

# Start Command  
cd backend && npm start
```

### Frontend (Netlify/Render)
```bash
# Build Command
cd frontend && npm run build

# Publish Directory
frontend/build
```

## 🧪 Testing Examples

### Postman Collection
```json
{
  "info": { "name": "Lost & Found API" },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{ \"name\": \"John Doe\", \"email\": \"john@example.com\", \"password\": \"password123\" }"
        },
        "url": "{{baseUrl}}/api/register"
      }
    }
  ]
}
```
