import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class TrainningTypeModel extends Model {
  public idTrainningType!: number;
  public name?: string;
}

TrainningTypeModel.init(
  {
    idTrainningType: {
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
    modelName: 'TrainningTypeModel',
  }
);

export default TrainningTypeModel;
