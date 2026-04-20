const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check if header exists and has the Bearer scheme
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  // 2. Extract the token
  const token = authHeader.split(' ')[1];

  try {
    // 3. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach the user object (usually decoded.id) to the request
    req.user = decoded; 
    next();
  } catch (err) {
    // 5. Handle expired or malformed tokens specifically
    return res.status(403).json({ message: 'Token is invalid or expired' });
  }
};

module.exports = protect;