# Bank Management System

## Overview

The Bank Management System is a web application that allows users to register, log in, and manage their bank accounts securely using OTP (One-Time Password) authentication. It includes an admin panel where administrators can view all users' bank account details, as well as features for users to edit and delete their account information.
Check Live Project At [Link](https://bankfroend.vercel.app/)

## Technologies

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework that provides pre-designed components.
- **Axios**: A promise-based HTTP client for making requests to the backend.

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A web application framework for Node.js, designed for building APIs.
- **MongoDB**: A NoSQL database for storing user and transaction data.
- **bcrypt**: A library for hashing passwords to secure user credentials.
- **jsonwebtoken**: A library for creating and verifying JSON Web Tokens (JWTs) for user authentication.

### Email Service
- **Sendinblue (Brevo)**: An email marketing and transactional email service for sending OTPs and notifications.

## Features

- **User Registration**: Users can register by providing their details. An OTP is sent to their email for verification.
- **User Login**: Users log in with their credentials and receive an OTP for authentication.
- **OTP Verification**: Users must verify their identity using the OTP sent to their email.
- **Edit Account Details**: Users can edit their account information.
- **Delete Account**: Users can delete their account if needed.
- **Admin Panel**: Admins can view all users' bank account details and manage user accounts. Mark isAdmin field in database as true to access admin panel.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB server running (either locally or using a service like MongoDB Atlas).
- Sendinblue account for email service.

### Installation

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd bank-management-system
   cd backend
    npm install
   ```
   Navigate to the backend directory:
   Install dependencies:
   ```
   npm install
    ```
  Create a .env file in the backend directory and add the following environment variables:
  ```
JWT_SECRET=your_jwt_secret
SENDINBLUE_API_KEY=your_sendinblue_api_key
MONGODB_URI=your_mongodb_connection_string
```
Start the backend server:
```
node server.js
```
Setup Frontend:
Navigate to the frontend directory:
```
cd ./frontend
```
Install dependencies:
```
npm install
```
Start the frontend application:
```
npm start
```
Usage
Access the application at http://localhost:3000.
Register a new user and follow the instructions to verify your email and log in.
Users can edit their account details or delete their account from the account settings.
Access the admin panel to manage users.
Contributing
Feel free to contribute to this project by opening issues or submitting pull requests.

License
This project is licensed under the MIT License.
