import { Request, Response } from 'express';
import { list, get } from '../services/ExerciseService';
import Exercise from '../models/Exercise';

export const getExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await list();
    return res.status(200).json({ exercises });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getExercise = async (req: Request, res: Response) => {
  try {
    const exerciseId = parseInt(req.params.exerciseId as string);
    if (!exerciseId || isNaN(exerciseId)) return res.status(400).json({ message: 'Exercise id is required' });

    const exercise = await get(exerciseId);
    if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
    return res.status(200).json({ exercise });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateExercise = async (req: Request, res: Response) => {
  try {
    const { exerciseId } = req.params;

    const { name, description, video, image1, image2, type } = req.body;

    // Buscar el ejercicio por ID
    const exercise = await Exercise.findByPk(exerciseId);

    // Si no se encuentra el ejercicio, devolver un error
    if (!exercise) {
      return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }

    exercise.name = name || exercise.name;
    exercise.description = description || exercise.description;
    exercise.video = video || exercise.video;
    exercise.image1 = image1 || exercise.image1;
    exercise.image2 = image2 || exercise.image2;
    exercise.type = type || exercise.type;

    // Guardar los cambios en la base de datos
    await exercise.save();

    // Devolver el ejercicio actualizado
    return res.status(200).json(exercise);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createExercise = async (req: Request, res: Response) => {
  try {
    const { name, description, video, image1, image2, type } = req.body;

    const newExercise = await Exercise.create({
      name,
      description,
      video,
      image1,
      image2,
      type,
    });

    return res.status(201).json(newExercise);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getExercises, getExercise, createExercise, updateExercise };
