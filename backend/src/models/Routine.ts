// models/Routine.ts

import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class Routine extends Model {
  public idRoutine!: number;
  public name?: string;
  public startDate?: Date;
  public endDate?: Date;
  public objective?: string;
  public observation?: string;
  public weekDay?: number;
  public idClient?: number;
  public idGroup?: number;
}

Routine.init(
  {
    idRoutine: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    objective: {
      type: DataTypes.STRING,
    },
    observation: {
      type: DataTypes.STRING,
    },
    idClient: {
      type: DataTypes.INTEGER,
    },
    idGroup: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'Routine',
  }
);

export default Routine;
