import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class ClientHasRoutine extends Model {
  public idClientHasRoutine!: number;
}

ClientHasRoutine.init(
  {
    idClientHasRoutine: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ClientHasRoutine',
    timestamps: false,
  }
);

export default ClientHasRoutine;
