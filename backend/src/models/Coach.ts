import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class Coach extends Model {
  public idCoach!: number;
  public idUser!: number;
}

Coach.init(
  {
    idCoach: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: 'Coach',
    timestamps: false,
  }
);

export default Coach;
