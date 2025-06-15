const User = require('../Models/UserModel');

// Parent Signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password, role: 'Parent' });
    await user.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(400).json({ error: 'Email already in use' });
  }
};

// Parent Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Doctor Login (Hardcoded)
exports.doctorLogin = (req, res) => {
  const { email, password } = req.body;
  if (email === 'doctor@gmail.com' && password === 'doctor123') {
    res.json({ message: 'Doctor login successful' });
  } else {
    res.status(401).json({ error: 'Invalid doctor credentials' });
  }
};

// Logout (token invalidation)
exports.logout = async (req, res) => {
  try {
    // If using cookies
    res.clearCookie('token');
    
    // If using tokens in frontend storage, the frontend should remove it
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Logout failed' });
  }
};

// Middleware to verify tokens
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
