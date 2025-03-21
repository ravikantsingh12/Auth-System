import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const ALLOWED_IP = "192.168.0.210"; // Allowed IP address (for demo)

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Checking if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  // To capture the user's IP address
  let clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;
  
  // Normalize the IP address if it's localhost or similar
  if (clientIP === "::1" || clientIP === "::ffff:127.0.0.1") {
    clientIP = "127.0.0.1";
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).send("User already exists");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user and store IP address
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    ipAddress: clientIP,  // Store the captured IP address here
  });

  // Saving user to database
  await newUser.save();

  // Emitting a registration success event
  req.app.get("io").emit("registrationSuccess", "User registered successfully");

  // Redirecting to the login page after successful registration
  res.redirect('/');
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); // Finds the user by email
    if (!user) return res.status(400).send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password); // Compares the provided password with the hashed password
    if (!isMatch) return res.status(400).send("Invalid credentials");

    // Captures the user's IP address for login validation
    let clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;
    if (clientIP === "::1" || clientIP === "::ffff:127.0.0.1") clientIP = "127.0.0.1"; 

    const splitedClientIp = clientIP.split(", ");
    clientIP = splitedClientIp[0];

    const userIp = user.ipAddress.split(", ");
    const userIpAddress = userIp[0];

    // Check if the IP address matches the stored one
    if (clientIP !== userIpAddress) {
      req.app.get("io").emit("alert", {
        message: "Login attempted from unauthorized IP. You will be redirected to the registration page in 30 seconds."
      });

      setTimeout(() => {
        req.app.get("io").emit("redirectToRegister");
      }, 30000); // Wait 30 seconds before redirecting

      return res.render("pages/register", { error: "Unauthorized IP. Redirecting in 30s..." });
    }

    // Create a JWT token with user details and IP address
    const token = jwt.sign(
      { id: user._id, ip: clientIP },
      process.env.SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Storeing the token in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000 // 1 hour
    });

    res.redirect('/dashboard');
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Server error");
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('token');
  req.app.get("io").emit("logoutSuccess", "Logged out successfully");
  res.redirect('/'); // Redirects to home page
};

export { registerUser, loginUser, logoutUser };
