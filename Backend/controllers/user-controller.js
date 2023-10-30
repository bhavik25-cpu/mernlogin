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

  // Extract user input (email and password) from the request body.
  // Try to find a user with the provided email.

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  // If no user with the provided email is found, return a 401 response (Unauthorized).

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare the provided password with the stored hashed password.
  // If they don't match, return a 401 response.

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "35s",
  });
  console.log("Generated Token\n", token);

  // If the credentials are valid, create a JSON Web Token (JWT) containing the user's ID.
  // The token is signed with a secret key and set to expire in 35 seconds.

  return res.status(200).json({ message: "Login successful", token: token });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  console.log(token, "tokentokentokentoken");

  if (!token) {
    res.status(404).json({ message: "No token found" });
    return;
  }

  // Extract the JWT from the "token" header in the request.

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
       res.status(400).json({ message: "Invalid Token" });
       return;
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

// Verify the authenticity of the token using the JWT library and the secret key.
// If the token is invalid, return a 400 response.

const getUser = async (req, res, next) => {
  const userId = req.id;
  console.log(req.id, "iddddddddddddddd");
  let user;
  try {
    user = await User.findById(userId, "-password");
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

// Extract the user ID from the token and attempt to find the user in the database.
// If the user is found, return the user's data with a 200 response. If not found, return a 404 response.

const logout = (req, res) => {
  res.redirect("/login");
};

module.exports = {
  signup,
  login,
  getUser,
  verifyToken,
  logout
};

// Export the functions as part of a module to be used in other parts of your application.
