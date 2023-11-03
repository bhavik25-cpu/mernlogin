// authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;
console.log(token,"verifyTokenverifyTokenverifyTokenverifyToken")
  if (!token) {
    return res.status(404).json({ message: 'No token found' });
  }

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid Token' });
    }
    req.id = user.id;
    console.log(req.id,"reqreqreqreqreq")
    next();
  });
};


const isLoggedIn = (req, res, next) => {
  console.log(req.id,"newidsssssssssssssssss")
  if (req.id) {
    return res.status(200).json({ message: 'User is logged in' });
  } else {
    return res.status(401).json({ message: 'User is not logged in' });
  }
};
module.exports = { verifyToken,isLoggedIn };
