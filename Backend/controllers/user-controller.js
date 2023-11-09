const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import necessary modules and the User model from their respective files.

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  
  // Extract user input (name, email, password) from the request body.
  // Try to find an existing user with the provided email.

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" });
  }
  
  // If a user with the same email already exists, return a 400 response.

  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  
  // Hash the password using bcrypt, then create a new User instance with the user data.

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  
  // Try to save the new user to the database.

  return res.status(201).json({ message: user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Login failed" });
  }

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  
  console.log("Generated Token\n", token);

  // Set a cookie with the JWT token
  res.cookie("authToken", token, {
    httpOnly: false, 
    maxAge: 60*60*24 * 1000,
    path:'/',
    secure: false,
    sameSite: "lax",
  });


  return res.status(200).json({ message: "Login successful" , user:user,token});
};



const getUser = async (req, res, next) => {
  const userId = req.id;
  console.log(req.id, "iddddddddddddddd");
  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }
    res.status(200).json({ user });
    return;
  } catch (err) {
    console.log("🚀 ~ file: user-controller.js:99 ~ getUser ~ err:", err);
    return new Error(err);
  }
};



const logout = (req, res, next) => {
    res.clearCookie("authToken");
    console.log(res.clearCookie,"qqqqqqqqqqqqqqqqq")
    return res.status(200).json({ message: "Successfully Logged Out" });
  };

module.exports = {
  signup,
  login,
  getUser,
  logout
};

