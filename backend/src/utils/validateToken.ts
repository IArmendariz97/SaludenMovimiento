import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { SECRET_KEY } = process.env;
//TODO: Esta funcion solo valida si el token es valido, no que el token este o no en la DB.
// Terminar de implementar.
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized: Token missing' });

  jwt.verify(token, SECRET_KEY || '', (err: any, user: any) => {
    console.error(err);

    if (err) return res.status(403).json({ message: 'Forbidden: Invalid token' });

    next();
  });
};

module.exports = { authenticateToken };
