import express, { Application, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './configs/db';
import router from './routes/api/v1/mainRouter';
import User from './models/User';
import Credential from './models/Credential';
import Session from './models/Session';
import Client from './models/Client';
import Coach from './models/Coach';
import Group from './models/Group';
import Routine from './models/Routine';
import Exercise from './models/Exercise';

import Post from './models/Post';
import Comment from './models/Comment';

import GroupExercise from './models/GroupExercise';
import ExerciseConfiguration from './models/ExerciseConfiguration';
import ClientHasRoutine from './models/ClientHasRoutine';
import ClientGroup from './models/ClientGroup';

const app: Application = express();
const PORT: number = 3000;

// Middlewares
app.use(express.json());
app.use(logger('dev'));
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// USER RELATIONS
User.hasMany(Credential, { foreignKey: 'idUser' });
Credential.belongsTo(User, { foreignKey: 'idUser', onDelete: 'CASCADE', hooks: true });

Session.belongsTo(Credential, { foreignKey: 'idCredential', onDelete: 'CASCADE', hooks: true });
Credential.hasMany(Session, { foreignKey: 'idCredential' });

//User.hasOne(Client, { foreignKey: 'idUser' });
Client.belongsTo(User, { foreignKey: 'idUser', onDelete: 'CASCADE', hooks: true });
User.hasOne(Client, { foreignKey: 'idUser' });
//User.hasOne(Coach, { foreignKey: 'idUser' });
Coach.belongsTo(User, { foreignKey: 'idUser', onDelete: 'CASCADE', hooks: true });

// CLIENT RELATIONS
ClientGroup.belongsTo(Client, { foreignKey: 'idClient' });
Client.hasMany(ClientGroup, { foreignKey: 'idClient' });

ClientGroup.belongsTo(Group, { foreignKey: 'idGroup' });
Group.hasMany(ClientGroup, { foreignKey: 'idGroup' });

Client.hasMany(Routine, { foreignKey: 'idClient' });
Routine.belongsTo(Client, { foreignKey: 'idClient', onDelete: 'CASCADE', hooks: true });

// GROUP RELATIONS
Group.hasMany(Routine, { foreignKey: 'idGroup' });
Routine.belongsTo(Group, { foreignKey: 'idGroup' });

// ROUTINE RELATIONS
Routine.hasMany(GroupExercise, { foreignKey: 'idRoutine' });
GroupExercise.belongsTo(Routine, { foreignKey: 'idRoutine', onDelete: 'CASCADE', hooks: true });

GroupExercise.hasMany(ExerciseConfiguration, { foreignKey: 'idGroupExercise' });
ExerciseConfiguration.belongsTo(GroupExercise, { foreignKey: 'idGroupExercise', onDelete: 'CASCADE', hooks: true });

Exercise.hasMany(ExerciseConfiguration, { foreignKey: 'idExercise' });
ExerciseConfiguration.belongsTo(Exercise, { foreignKey: 'idExercise' });

//Post relations
Post.belongsTo(Client, { foreignKey: 'idClient' });
Client.hasMany(Post, { foreignKey: 'idClient' });

Comment.belongsTo(Client, { foreignKey: 'idClient' });
Client.hasMany(Comment, { foreignKey: 'idClient' });

Post.hasMany(Comment, { foreignKey: 'idPost', onDelete: 'CASCADE', hooks: true });
Comment.belongsTo(Post, { foreignKey: 'idPost', onDelete: 'CASCADE', hooks: true });

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database & tables created!`);
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error(err);
  });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = (err as any).status || 500;
  const message = (err as any).message || err;
  console.error(err);
  res.status(status).json(message);
});

app.use('/', router);

export default app;
