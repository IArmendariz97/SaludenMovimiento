import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class Post extends Model {
  public idPost!: number;
  public title!: string;
  public content!: string;
  public idClient!: number;
}

Post.init(
  {
    idPost: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    idClient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Post',
  }
);

export default Post;
