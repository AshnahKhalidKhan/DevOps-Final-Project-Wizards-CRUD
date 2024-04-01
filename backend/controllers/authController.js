import { authService } from '../services/authService.js';

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await authService.signup(username, password);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Signup failed' });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await authService.login(username, password);
        res.json(result);
    } catch (error) {
        let status = 500;
        let message = 'Login failed';

        if (error.message === 'User not found' || error.message === 'Invalid password') {
            status = 401;
            message = error.message;
        }

        res.status(status).json({ error: message });
    }
};
