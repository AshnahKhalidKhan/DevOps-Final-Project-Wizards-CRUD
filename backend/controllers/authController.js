import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("I am the username", username);
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, 'folio-backend', {
      expiresIn: '5h', 
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
