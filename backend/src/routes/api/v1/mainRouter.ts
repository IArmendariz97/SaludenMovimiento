import { Router } from 'express';

import { authRouter } from './AuthRoute';

import userRouter from './UsersRoute';
import routineRouter from './RoutineRoute';
import exerciseRouter from './ExercisesRoute';
import postRoutes from './PostRoute';
import commentRouter from './CommentRoute';
import { authenticateToken } from '../../../utils/validateToken';
import groupRouter from './GroupRoute';
import coachRouter from './CoachRoute';

const router = Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/groups', groupRouter);
router.use('/api/v1/users', userRouter);
router.use('/api/v1/coach', coachRouter);
router.use('/api/v1/exercises', exerciseRouter);
router.use('/api/v1/routines', routineRouter);
router.use('/api/v1/posts', postRoutes);
router.use('/api/v1/comments', authenticateToken, commentRouter);

export default router;
