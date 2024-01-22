//@ts-nocheck
import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class User extends Model {
  public idUser!: number;
  public name!: string;
  public lastname!: string;
  public avatar?: string;
}

User.init(
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: false,
  }
);

export default User;
