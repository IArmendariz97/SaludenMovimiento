import User from './User';
import Session from './Session';
import Credential from './Credential';
import Client from './Client';
import Coach from './Coach';
import Group from './Group';
import Routine from './Routine';
import Exercise from './Exercise';
import RoutineHasExercise from './RoutineHasExercise';
import RoutineConfiguration from './ExerciseConfiguration';

// USER RELATIONS
User.hasMany(Credential, { foreignKey: 'idUser' });
Credential.belongsTo(User, { foreignKey: 'idUser' });

Session.belongsTo(Credential, { foreignKey: 'idCredential' });
Credential.hasMany(Session, { foreignKey: 'idCredential' });

//User.hasOne(Client, { foreignKey: 'idUser' });
Client.belongsTo(User, { foreignKey: 'idUser' });

//User.hasOne(Coach, { foreignKey: 'idUser' });
Coach.belongsTo(User, { foreignKey: 'idUser' });

// CLIENT RELATIONS
Client.belongsTo(Group, { foreignKey: 'idClient' });
Group.hasMany(Client, { foreignKey: 'idClient' });

Client.belongsToMany(Routine, { through: 'ClientHasRoutine' });
Routine.belongsToMany(Client, { through: 'ClientHasRoutine' });

// GROUP RELATIONS
//Group.hasOne(Routine);
Routine.hasOne(Group);

// ROUTINE RELATIONS
Routine.belongsToMany(Exercise, { through: RoutineHasExercise });
Exercise.belongsToMany(Routine, { through: RoutineHasExercise });
RoutineHasExercise.belongsTo(RoutineConfiguration);
//RoutineConfiguration.belongsTo(RoutineHasExercise);

export { User, Session, Credential, Client, Coach, Group, Routine, Exercise, RoutineHasExercise, RoutineConfiguration };
