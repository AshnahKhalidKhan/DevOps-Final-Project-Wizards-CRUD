import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

const signup = async (username, password) => {
    const user = new User({ username, password });
    await user.save();
    return { message: 'Signup successful' };
};

const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, 'folio-backend', {
        expiresIn: '5h',
    });

    return { token };
};

export const authService = {
    signup,
    login,
};
