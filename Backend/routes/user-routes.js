const express = require("express");
const {
  signup,
  login,
  getUser,
  logout
  
} = require("../controllers/user-controller");
const { verifyToken } = require('../Middleware/authMiddleware'); // Import the verifyToken middleware.


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.post("/logout", verifyToken, logout);
router.get('/is-login', (req,res)=>{
  console.log(req.cookies, 'cookies')
  if(!req.cookies) return res.sendStatus(400)
  return res.sendStatus(200)
})

module.exports = router;