# E-Commerce API

A robust RESTful API built with Node.js, Express.js, and MongoDB for e-commerce applications. This API provides endpoints for managing products, users, carts, orders, and payments.

## Features

- 🔐 User Authentication & Authorization
- 📦 Product Management
- 🛒 Shopping Cart Operations
- 📝 Order Processing
- 💳 Payment Integration
- 🔑 JWT-based Authentication
- ✅ Input Validation using Joi
- 🗃️ MongoDB Database Integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Joi
- **Security**: bcryptjs for password hashing
- **Other Tools**: CORS, dotenv for environment variables

## Project Structure

```
api/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── dtos/           # Data Transfer Objects
├── middlewares/    # Custom middleware functions
├── models/         # MongoDB models
├── router/         # API routes
├── seeder/         # Database seeding scripts
├── services/       # Business logic
└── utils/          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rabilalmurmu-se-glitch/ecommerce-api.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory and add your configuration:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. (Optional) Seed the database:
   ```bash
   npm run seeddb
   ```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with auto-reload

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - User login

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get a specific product
- POST /api/products - Create a new product (Admin only)
- PUT /api/products/:id - Update a product (Admin only)
- DELETE /api/products/:id - Delete a product (Admin only)

### Cart
- GET /api/cart - Get user's cart
- POST /api/cart - Add item to cart
- PUT /api/cart/:itemId - Update cart item
- DELETE /api/cart/:itemId - Remove item from cart

### Orders
- GET /api/orders - Get user's orders
- POST /api/orders - Create a new order
- GET /api/orders/:id - Get specific order details

### Payments
- POST /api/payments - Process payment for an order

## Security

- Password hashing using bcryptjs
- JWT-based authentication
- Input validation using Joi
- CORS enabled
- Environment variables for sensitive data

## Error Handling

The API implements centralized error handling with appropriate HTTP status codes and error messages.

## Database Models

- User
- Product
- Cart
- Order
- Payment

