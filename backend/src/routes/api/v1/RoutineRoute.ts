import express from 'express';
import {
  createRoutine,
  getRoutine,
  getRoutines,
  updateRoutine,
  updateRoutineConfiguration,
} from '../../../controllers/RoutineController';

const routineRouter = express.Router();

routineRouter.post('/', createRoutine);
routineRouter.put('/:routineId', updateRoutine);
//routineRouter.get('/:routineId/exercises', authenticateToken, getRoutineExercises);
routineRouter.put('/config/:routineId', updateRoutineConfiguration);
routineRouter.get('/:routineId', getRoutine);
routineRouter.get('/', getRoutines);

export default routineRouter;
