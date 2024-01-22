// controllers/commentController.ts
import { Request, Response } from 'express';
import Comment from '../models/Comment';

export const createComment = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const idPost = req.params.idPost;
  const { content, userId } = req.body;
  console.log('content', content);
  console.log('idPost', idPost);

  try {
    const comment = await Comment.create({ content, idPost, idClient: userId });

    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const commentId: number = parseInt(req.params.commentId, 10);
  console.log('commentId', commentId);

  try {
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
    }

    await Comment.destroy({ where: { idComment: commentId } });

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
