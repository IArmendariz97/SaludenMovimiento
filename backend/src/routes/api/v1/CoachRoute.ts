import express from 'express';
import { createCoach, getCoaches } from '../../../controllers/CoachController';

const coachRouter = express.Router();

coachRouter.post('/', createCoach);
coachRouter.get('/', getCoaches);

export default coachRouter;
