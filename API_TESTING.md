# API Testing Examples (Postman)

This document provides examples for testing all API endpoints using Postman or any other API client.

## Base URL
```
http://localhost:5000
```

## Authentication Endpoints

### 1. Register User
**Method:** POST  
**URL:** `/api/register`  
**Headers:** Content-Type: application/json  
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400):**
```json
{
  "msg": "User already exists"
}
```

### 2. Login User
**Method:** POST  
**URL:** `/api/login`  
**Headers:** Content-Type: application/json  
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400):**
```json
{
  "msg": "Invalid credentials"
}
```

## Item Endpoints

### 3. Get All Items
**Method:** GET  
**URL:** `/api/items`  
**Headers:** None required

**Success Response (200):**
```json
[
  {
    "_id": "64a1b2c3d4e5f6789012345",
    "itemName": "Lost Wallet",
    "description": "Black leather wallet with ID cards",
    "type": "Lost",
    "location": "Library",
    "date": "2023-07-01T00:00:00.000Z",
    "contactInfo": "john@example.com",
    "user": {
      "_id": "64a1b2c3d4e5f6789012346",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2023-07-01T12:00:00.000Z"
  }
]
```

### 4. Get Item by ID
**Method:** GET  
**URL:** `/api/items/64a1b2c3d4e5f6789012345`  
**Headers:** None required

**Success Response (200):**
```json
{
  "_id": "64a1b2c3d4e5f6789012345",
  "itemName": "Lost Wallet",
  "description": "Black leather wallet with ID cards",
  "type": "Lost",
  "location": "Library",
  "date": "2023-07-01T00:00:00.000Z",
  "contactInfo": "john@example.com",
  "user": {
    "_id": "64a1b2c3d4e5f6789012346",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "createdAt": "2023-07-01T12:00:00.000Z"
}
```

**Error Response (404):**
```json
{
  "msg": "Item not found"
}
```

### 5. Search Items by Name
**Method:** GET  
**URL:** `/api/items/search?name=wallet`  
**Headers:** None required

**Success Response (200):**
```json
[
  {
    "_id": "64a1b2c3d4e5f6789012345",
    "itemName": "Lost Wallet",
    "description": "Black leather wallet with ID cards",
    "type": "Lost",
    "location": "Library",
    "date": "2023-07-01T00:00:00.000Z",
    "contactInfo": "john@example.com",
    "user": {
      "_id": "64a1b2c3d4e5f6789012346",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2023-07-01T12:00:00.000Z"
  }
]
```

### 6. Add New Item (Protected)
**Method:** POST  
**URL:** `/api/items`  
**Headers:** 
- Content-Type: application/json
- x-auth-token: `your_jwt_token_here`

**Body:**
```json
{
  "itemName": "Found Keys",
  "description": "Set of house keys with blue keychain",
  "type": "Found",
  "location": "Cafeteria",
  "date": "2023-07-02",
  "contactInfo": "call 555-0123"
}
```

**Success Response (200):**
```json
{
  "_id": "64a1b2c3d4e5f6789012347",
  "itemName": "Found Keys",
  "description": "Set of house keys with blue keychain",
  "type": "Found",
  "location": "Cafeteria",
  "date": "2023-07-02T00:00:00.000Z",
  "contactInfo": "call 555-0123",
  "user": {
    "_id": "64a1b2c3d4e5f6789012346",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "createdAt": "2023-07-02T14:30:00.000Z"
}
```

**Error Response (401):**
```json
{
  "msg": "No token, authorization denied"
}
```

### 7. Update Item (Protected - Owner Only)
**Method:** PUT  
**URL:** `/api/items/64a1b2c3d4e5f6789012345`  
**Headers:** 
- Content-Type: application/json
- x-auth-token: `your_jwt_token_here`

**Body:**
```json
{
  "itemName": "Lost Wallet - Updated",
  "description": "Black leather wallet with ID cards and credit cards",
  "type": "Lost",
  "location": "Library - Main Hall",
  "date": "2023-07-01",
  "contactInfo": "email john@example.com"
}
```

**Success Response (200):**
```json
{
  "_id": "64a1b2c3d4e5f6789012345",
  "itemName": "Lost Wallet - Updated",
  "description": "Black leather wallet with ID cards and credit cards",
  "type": "Lost",
  "location": "Library - Main Hall",
  "date": "2023-07-01T00:00:00.000Z",
  "contactInfo": "email john@example.com",
  "user": {
    "_id": "64a1b2c3d4e5f6789012346",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "createdAt": "2023-07-01T12:00:00.000Z"
}
```

**Error Response (401):**
```json
{
  "msg": "Not authorized"
}
```

### 8. Delete Item (Protected - Owner Only)
**Method:** DELETE  
**URL:** `/api/items/64a1b2c3d4e5f6789012345`  
**Headers:** 
- x-auth-token: `your_jwt_token_here`

**Success Response (200):**
```json
{
  "msg": "Item removed"
}
```

**Error Response (401):**
```json
{
  "msg": "Not authorized"
}
```

## Testing Workflow

1. **Register a new user** using the register endpoint
2. **Login** to get the JWT token
3. **Copy the token** from the login response
4. **Add the token** to headers for protected endpoints
5. **Test CRUD operations** for items
6. **Test search functionality**
7. **Test authorization** by trying to access/modify other users' items

## Common Error Scenarios

### Invalid Token
**Request:** Any protected endpoint without valid token  
**Response (401):**
```json
{
  "msg": "No token, authorization denied"
}
```

### Expired Token
**Request:** Any protected endpoint with expired token  
**Response (401):**
```json
{
  "msg": "Token is not valid"
}
```

### Unauthorized Access
**Request:** Try to update/delete item owned by another user  
**Response (401):**
```json
{
  "msg": "Not authorized"
}
```

### Validation Errors
**Request:** Missing required fields in item creation  
**Response (500):**
```json
"Server Error"
```

## Postman Collection

You can import the following collection into Postman:

```json
{
  "info": {
    "name": "Lost & Found API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/register",
              "host": ["{{baseUrl}}"],
              "path": ["api", "register"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/login",
              "host": ["{{baseUrl}}"],
              "path": ["api", "login"]
            }
          }
        }
      ]
    },
    {
      "name": "Items",
      "item": [
        {
          "name": "Get All Items",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{baseUrl}}/api/items",
              "host": ["{{baseUrl}}"],
              "path": ["api", "items"]
            }
          }
        },
        {
          "name": "Add Item",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              },
              {
                "key": "x-auth-token",
                "value": "{{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"itemName\": \"Found Keys\",\n  \"description\": \"Set of house keys with blue keychain\",\n  \"type\": \"Found\",\n  \"location\": \"Cafeteria\",\n  \"date\": \"2023-07-02\",\n  \"contactInfo\": \"call 555-0123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/items",
              "host": ["{{baseUrl}}"],
              "path": ["api", "items"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```
