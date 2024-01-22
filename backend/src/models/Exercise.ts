import { DataTypes, Model, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin } from 'sequelize';
import sequelize from '../configs/db';
import ExerciseConfiguration from './ExerciseConfiguration';

interface ExerciseAttributes {
  idExercise: number;
  name?: string;
  description?: string;
  type?: string;
  video?: string;
  image1?: string;
  image2?: string;
}

interface ExerciseCreationAttributes extends Partial<ExerciseAttributes> {}

interface ExerciseInstance extends Model<ExerciseAttributes, ExerciseCreationAttributes> {
  addExerciseConfiguration: BelongsToManyAddAssociationMixin<ExerciseConfiguration, number>;
  getExerciseConfigurations: BelongsToManyGetAssociationsMixin<ExerciseConfiguration>;
}

class Exercise extends Model<ExerciseAttributes, ExerciseCreationAttributes> implements ExerciseInstance {
  public idExercise!: number;
  public name?: string;
  public description?: string;
  public type?: string;
  public video?: string;
  public image1?: string;
  public image2?: string;

  public addExerciseConfiguration!: BelongsToManyAddAssociationMixin<ExerciseConfiguration, number>;
  public getExerciseConfigurations!: BelongsToManyGetAssociationsMixin<ExerciseConfiguration>;

  public static associate(models: any): void {
    this.belongsToMany(models.ExerciseConfiguration, { through: 'ExerciseHasConfiguration', foreignKey: 'idExercise' });
  }
}

Exercise.init(
  {
    idExercise: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    video: {
      type: DataTypes.STRING,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Exercise',
    timestamps: false,
  }
);

export default Exercise;
