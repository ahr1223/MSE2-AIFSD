# Lost & Found Item Management System

A complete MERN stack application for managing lost and found items with user authentication.

## Tech Stack

- **MongoDB** (Mongoose) - Database
- **Express.js** - Backend Framework
- **React.js** - Frontend Framework
- **Node.js** - Runtime Environment
- **JWT** - Authentication
- **bcrypt** - Password Hashing
- **Axios** - HTTP Client
- **Bootstrap** - UI Framework

## Features

- User Registration & Login
- JWT Authentication
- Add Lost/Found Items
- View All Items
- Search Items by Name
- Edit/Delete Own Items
- Responsive Design

## Project Structure

```
Ai-FSD/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Item.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── items.js
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.js
│   │   │   ├── Login.js
│   │   │   └── Dashboard.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Setup Instructions

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

Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017/lostfound
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

Start the backend server:
```bash
npm start
# or for development
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Items
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item by ID
- `GET /api/items/search?name=xyz` - Search items by name
- `POST /api/items` - Add new item (Protected)
- `PUT /api/items/:id` - Update item (Protected, owner only)
- `DELETE /api/items/:id` - Delete item (Protected, owner only)

## Data Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  date: Date (default: current date)
}
```

### Item Model
```javascript
{
  itemName: String (required),
  description: String (required),
  type: String (enum: ['Lost', 'Found']),
  location: String (required),
  date: Date (required),
  contactInfo: String (required),
  user: ObjectId (ref: 'User'),
  createdAt: Date (default: current date)
}
```

## Usage

1. **Register**: Create a new account with name, email, and password
2. **Login**: Access your account with email and password
3. **Dashboard**: 
   - Add lost or found items
   - View all items in the system
   - Search items by name
   - Edit or delete your own items
   - Logout when done

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables:
   - `MONGO_URI` (your MongoDB connection string)
   - `JWT_SECRET` (your secret key)

### Frontend (Netlify/Render)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder to Netlify or Render
3. Set environment variables if needed

## Environment Variables

### Backend
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Server port (default: 5000)

## Error Handling

The application handles the following errors:
- Duplicate email registration
- Invalid login credentials
- Unauthorized access attempts
- Server errors with appropriate messages

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes for sensitive operations
- User ownership validation for item operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

