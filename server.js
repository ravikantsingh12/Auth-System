import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import ejsLayouts from "express-ejs-layouts";
import path from "path"; 
import dotenv from 'dotenv';
import session from 'express-session';
import { Server } from 'socket.io';
import { createServer } from 'http';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 5000;

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.set("views", path.join(path.resolve(), "views")); 

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Add static middleware
app.use('/public', express.static('public'));

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Client connected');
});

app.set('io', io);

// Routes
app.use('/api/auth', authRoutes);

// Home/Login page
app.get('/', (req, res) => {
  res.render('pages/index');
});

// Register page
app.get('/register', (req, res) => {
  res.render('pages/register');
});

// Dashboard page (protected route)
app.get('/dashboard', (req, res) => {
  res.render('pages/dashboard');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
