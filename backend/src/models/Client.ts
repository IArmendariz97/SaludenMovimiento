import { DataTypes, Model, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin } from 'sequelize';
import sequelize from '../configs/db';
import Routine from './Routine';
import Group from './Group'; // Import the Group model
import ClientGroup from './ClientGroup'; // Import the ClientGroup model

interface TrainingLog {
  date: Date;
  idRoutine: number;
}
interface ClientAttributes {
  idClient: number;
  idUser: number;
  trainingLogs: TrainingLog[];
}

interface ClientCreationAttributes extends Partial<ClientAttributes> {}

interface ClientInstance extends Model<ClientAttributes, ClientCreationAttributes> {
  addRoutine: BelongsToManyAddAssociationMixin<Routine, number>;
  getRoutines: BelongsToManyGetAssociationsMixin<Routine>;
  getGroups: BelongsToManyGetAssociationsMixin<Group>; // Add this line for groups
}

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientInstance {
  public idClient!: number;
  public idUser!: number;
  public trainingLogs!: TrainingLog[];
  public addRoutine!: BelongsToManyAddAssociationMixin<Routine, number>;
  public getRoutines!: BelongsToManyGetAssociationsMixin<Routine>;
  public getGroups!: BelongsToManyGetAssociationsMixin<Group>; // Add this line for groups

  public static associate(models: any): void {
    // Routine association
    this.belongsToMany(models.Routine, { through: 'ClientRoutine', foreignKey: 'idClient' });

    // Group association
    this.belongsToMany(models.Group, { through: ClientGroup, foreignKey: 'idClient' });
  }
}

Client.init(
  {
    idClient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    trainingLogs: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: [],
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Client',
    timestamps: false,
  }
);

export default Client;
