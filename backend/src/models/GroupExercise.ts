import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class GroupExercise extends Model {
  public idGroupExercise!: number;
  public day?: string;
}

GroupExercise.init(
  {
    idGroupExercise: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'GroupExercise',
    timestamps: false,
  }
);

export default GroupExercise;
