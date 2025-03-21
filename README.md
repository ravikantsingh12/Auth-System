# 🛡️ Authentication System with IP Restriction & Session Monitoring

## 📌 Project Overview
This project is a **secure authentication system** built with **Node.js, Express, MongoDB, and Socket.IO**. It restricts users to login only from their **registered IP address**, and **automatically logs them out** if an unauthorized login attempt is detected.

## 🚀 Features
- **JWT Authentication** (Token stored in HTTP-only cookies)
- **IP-based login restriction** (User must log in from their registered IP)
- **Session Monitoring** (Real-time alerts for unauthorized access)
- **Auto-logout on unauthorized login attempts**
- **Bootstrap-powered UI**
- **EJS-based dynamic pages**
- **Socket.IO for real-time alerts**

---

## 🏗️ Folder Structure
```bash
/auth-system                # Root folder for the authentication system
│── /config                 # Configuration files (Database, Environment settings, etc.)
│    ├── db.js              # Database connection setup using MongoDB
│── /models                 # Mongoose models (Database Schema)
│    ├── User.js            # User schema for authentication
│── /routes                 # Route handlers for authentication and other API endpoints
│    ├── authRoutes.js      # Routes for login, registration, and session monitoring
│── /controllers            # Business logic for authentication
│    ├── authController.js  # Handles user authentication (register, login, logout)
│── /middlewares            # Middleware functions for authentication & authorization
│    ├── authMiddleware.js  # Protects routes and enforces authentication rules
│── /views                  # Frontend views (EJS templates)
│    ├── /partials          # Reusable UI components (Header, Footer)
│    │   ├── header.ejs     # Header template (Navbar, logo, etc.)
│    │   ├── footer.ejs     # Footer template (Copyright, links, etc.)
│    ├── /pages             # Page-specific EJS views
│    │   ├── index.ejs      # Home page (Welcome screen)
│    │   ├── register.ejs   # User registration form
│    │   ├── login.ejs      # Login page with validation
│    │   ├── dashboard.ejs  # User dashboard after login
│    ├── layout.ejs         # Main layout file (Wraps all pages)
│── /public                 # Static assets (CSS, JS, images)
│    ├── style.css          # Global styles for UI design
│    ├── socket.js          # Client-side Socket.io script for session monitoring
│    ├── /js                # JavaScript files for frontend functionality
│    │   ├── login.js       # Handles login form validation and AJAX requests
│── server.js               # Main entry point for the Node.js server
│── package.json            # Project metadata and dependencies
│── .env                    # Environment variables (Secrets, API keys)
│── README.md               # Documentation for setup and usage
```
## ⚙️ Installation & Setup
**1. Clone the Repository**
```bash
git clone https://github.com/your-repo/auth-system.git
cd auth-system
```
**2. Install Dependencies**
```bash
npm install
```
**3. Configure Environment Variables**
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
SECRET_KEY=your_secret_key
JWT_EXPIRATION=1h
```
**4. Start the Server**
```bash
npm start
```
The application will be available at http://localhost:5000/

## 💻 Technologies Used
- ### Node.js
- ### Express.js
- ### MongoDB (Mongoose)
- ### JWT Authentication
- ### Socket.IO
- ### Bootstrap
- ### EJS Templating

## 📝 Author
This project was created by [Ravikant Singh](https://github.com/ravikantsingh12).

## Follow me on

- [LinkedIn](https://www.linkedin.com/in/ravikant-singh-327a98241)