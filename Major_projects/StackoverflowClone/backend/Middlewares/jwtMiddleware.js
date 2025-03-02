const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const jwtAuthMiddleware = (req, res, next) => {
  // Extract token from authorization header (Bearer token)
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) 
    return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace with your secret key

    // Attach user info to request object
    req.user = decoded; // Add decoded user data to request for further processing in routes

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });
};


module.exports = { jwtAuthMiddleware, generateToken };