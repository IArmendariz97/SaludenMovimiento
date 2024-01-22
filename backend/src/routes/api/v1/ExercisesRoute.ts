import express from 'express';
import { getExercises, getExercise, createExercise, updateExercise } from '../../../controllers/ExerciseController';
import { authenticateToken } from '../../../utils/validateToken';

const exerciseRouter = express.Router();

exerciseRouter.post('/', createExercise);
exerciseRouter.get('/:exerciseId', getExercise);
exerciseRouter.get('/', getExercises);
exerciseRouter.put('/:exerciseId', updateExercise);

export default exerciseRouter;
