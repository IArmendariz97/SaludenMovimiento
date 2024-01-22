// routes/commentRoute.ts
import express, { Router } from 'express';
import { createComment, deleteComment } from '../../../controllers/CommentController';

const commentRouter: Router = express.Router();

commentRouter.post('/:idPost', createComment);
commentRouter.delete('/:commentId', deleteComment);

export default commentRouter;
