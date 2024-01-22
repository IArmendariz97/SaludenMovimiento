import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class ExerciseConfiguration extends Model {
  public idExerciseConfiguration!: number;
  public series?: number;
  public day?: String;
  public weight?: number;
  public repetitions?: number;
  public restTime?: number;
  public progressWeight?: number;

  // public order?: number;
}

ExerciseConfiguration.init(
  {
    idExerciseConfiguration: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    series: {
      type: DataTypes.INTEGER,
    },
    repetitions: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    progressWeight: {
      type: DataTypes.INTEGER,
    },

    order: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'ExerciseConfiguration',
    timestamps: false,
  }
);

export default ExerciseConfiguration;
