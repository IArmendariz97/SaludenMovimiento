import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db';

class Session extends Model {
  public idSession!: number;
  public token!: string;
  public created_date!: Date;
  public updated_date!: Date;

}

Session.init(
  {
    idSession: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      unique: true,
    },
    created_date: {
      type: DataTypes.DATE,
    },
    updated_date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Session',
    timestamps: false,
    
  }
);

export default Session;
