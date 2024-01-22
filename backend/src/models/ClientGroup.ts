import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class ClientGroup extends Model {
  public idClient!: number;
  public idGroup!: number;
}

ClientGroup.init(
  {
    idClient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idGroup: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: 'ClientGroup',
    timestamps: false,
  }
);

export default ClientGroup;
