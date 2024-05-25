const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  //first check the request header has authorization or not
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "Token not found" });
  }
  //Extract thr JWT token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Attach user Information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid Token" });
  }
};

//Function to Generate A  JWT Token
const generateToken = (userData) => {
  //Generate A JWT Token
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30000 });
};

module.exports = { jwtAuthMiddleware, generateToken };
