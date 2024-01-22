import { DataTypes, Model, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin } from 'sequelize';
import sequelize from '../configs/db';
import Client from './Client';
import Routine from './Routine';
import ClientGroup from './ClientGroup';

interface GroupAttributes {
  idGroup: number;
  name?: string;
}

interface GroupCreationAttributes extends Partial<GroupAttributes> {}

interface GroupInstance extends Model<GroupAttributes, GroupCreationAttributes> {
  getClients: BelongsToManyGetAssociationsMixin<Client>;
  addClient: BelongsToManyAddAssociationMixin<Client, number>;

  getRoutines: BelongsToManyGetAssociationsMixin<Routine>;
  addRoutine: BelongsToManyAddAssociationMixin<Routine, number>;
}

class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupInstance {
  public idGroup!: number;
  public name?: string;

  public getClients!: BelongsToManyGetAssociationsMixin<Client>;
  public addClient!: BelongsToManyAddAssociationMixin<Client, number>;

  public getRoutines!: BelongsToManyGetAssociationsMixin<Routine>;
  public addRoutine!: BelongsToManyAddAssociationMixin<Routine, number>;

  // Otras asociaciones que puedas tener
}

Group.init(
  {
    idGroup: {
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
    modelName: 'Group',
  }
);

// Asociación muchos a muchos con Client
Group.belongsToMany(Client, {
  through: ClientGroup, // Nombre de la tabla intermedia
  foreignKey: 'idGroup', // Clave foránea en la tabla intermedia que apunta a Group
  otherKey: 'idClient', // Clave foránea en la tabla intermedia que apunta a Client
});

// Asociación muchos a muchos con Routine
Group.belongsToMany(Routine, {
  through: 'GroupRoutine', // Nombre de la tabla intermedia
  foreignKey: 'idGroup', // Clave foránea en la tabla intermedia que apunta a Group
  otherKey: 'idRoutine', // Clave foránea en la tabla intermedia que apunta a Routine
});

export default Group;
