import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { isRegistered, create } from '../services/AuthService';
import { create as createSession, remove, find } from '../services/SessionService';
const { SECRET_KEY } = process.env;

export const register = async (req: Request, res: Response) => {
  try {
    if (!req?.body?.email || !req?.body?.password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const { email, password } = req.body;
    const existingUser = await isRegistered(email);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(req.body);

    const user = await create(email, hashedPassword, req.body.name, req.body.lastname, req.body.avatar);

    if (user) {
      return res.status(201).json({ message: 'User registered successfully', user });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userCredentials = await isRegistered(email);

    if (!userCredentials) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, userCredentials.password);
    if (!isValidPassword) {
      return res.status(403).json({ message: 'Invalid credentials' });
    }

    const existingSession = await find(userCredentials.idCredential);

    if (!existingSession) {
      const token = jwt.sign({ userId: userCredentials.idCredential }, SECRET_KEY || '', { expiresIn: '24h' });
      const newSession = await createSession(token, userCredentials.idCredential);

      return res.status(200).json({
        message: 'User logged',
        session: {
          token: newSession.token,
          userId: userCredentials.idCredential,
        },
      });
    }

    const token = jwt.sign({ userId: userCredentials.idCredential }, SECRET_KEY || '', { expiresIn: '24h' });
    const newSession = await createSession(token, userCredentials.idCredential);
    const rowsAffected = await remove(existingSession.token);
    console.log(rowsAffected);

    return res.status(200).json({
      message: 'User logged',
      session: {
        token: newSession.token,
        userId: userCredentials.idCredential,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const rowsAffected = await remove(token);

    if (!rowsAffected) return res.status(401).json({ message: 'Unauthorized' });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    // TODO: implementar
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
