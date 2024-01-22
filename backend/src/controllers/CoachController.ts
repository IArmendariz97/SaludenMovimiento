import { Request, Response } from 'express';
import Coach from '../models/Coach';
import { listCoaches } from '../services/UserService';

export const createCoach = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User id is required in the request body' });
    }

    // Verificar si el usuario ya tiene un cliente asociado
    const existingCoach = await Coach.findOne({ where: { idUser: userId } });
    if (existingCoach) {
      return res.status(400).json({ message: 'Coach already exists for this user' });
    }

    const newCoach = await Coach.create({
      idUser: userId,
    });

    return res.status(201).json({ message: 'Coach created successfully', newCoach });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCoaches = async (req: Request, res: Response) => {
  try {
    const coach = await listCoaches();

    return res.status(200).json({ message: 'all coach', coach });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
