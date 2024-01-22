import express from 'express';
import { register, login, logout, refresh } from '../../../controllers/AuthController';
import { authenticateToken } from '../../../utils/validateToken';

export const authRouter = express.Router();

// Register User
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', authenticateToken, logout);
authRouter.post('/refresh', refresh);
