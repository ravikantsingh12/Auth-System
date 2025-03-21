import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;  // Gets token from cookies

  if (!token) return res.status(401).send('No token provided');

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if request is coming from allowed IP
    let clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;
    if (clientIP === "::1" || clientIP === "::ffff:127.0.0.1") clientIP = "127.0.0.1"; 

    if (clientIP !== decoded.ip) {
      return res.status(401).json({
        message: 'Access denied - Invalid IP address'
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

export default authMiddleware;
