const express = require("express");
const {
  signup,
  login,
  getUser,
  logout
  
} = require("../controllers/user-controller");
const { verifyToken } = require('../Middleware/authMiddleware'); 
const { isLoggedIn } = require('../Middleware/authMiddleware'); 


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.post("/logout", verifyToken, logout);
router.get('/is-login', verifyToken,isLoggedIn);


module.exports = router;