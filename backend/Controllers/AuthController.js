const User = require('../Models/UserModel');

// Parent Signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
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
