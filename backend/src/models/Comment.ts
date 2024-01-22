import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';
import Post from './Post';

class Comment extends Model {
  public idComment!: number;
  public content!: string;
  public idClient!: number;
  public idPost!: number;
}

Comment.init(
  {
    idComment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    idPost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idClient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
  }
);
Comment.belongsTo(Post, { foreignKey: 'idPost' });

export default Comment;
