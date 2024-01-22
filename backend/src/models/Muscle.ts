import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class MuscleModel extends Model {
  public idMuscle!: number;
  public name?: string;
}

MuscleModel.init(
  {
    idMuscle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'MuscleModel',
    
  }
);

export default MuscleModel;
