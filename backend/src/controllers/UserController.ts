//@ts-nocheck
import { Request, Response } from 'express';
import User from '../models/User';
import { get, list, getRoutines, listClients, remove } from '../services/UserService';
import Client from '../models/Client';
import Routine from '../models/Routine';
import Exercise from '../models/Exercise';
import RoutineConfiguration from '../models/ExerciseConfiguration';
import GroupExercise from '../models/GroupExercise';
import ClientGroup from '../models/ClientGroup';
import sequelize from '../configs/db';
import { id } from 'date-fns/locale';

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await listClients();
    return res.status(200).json({ message: 'all clients', clients });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User id is required in the request body' });
    }

    // Verificar si el usuario ya tiene un cliente asociado
    const existingClient = await Client.findOne({ where: { idUser: userId } });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists for this user' });
    }

    const newClient = await Client.create({
      idUser: userId,
    });

    return res.status(201).json({ message: 'Client created successfully', newClient });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTrainingDays = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.clientId as string);
    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });
    console.log(req.params, 'req.params');

    const client = await Client.findByPk(userId);

    if (!client) {
      return res.status(400).json({ message: 'Client not found' });
    }
    console.log(client.trainingLogs, 'client.trainingLogs');

    const trainingLogs = client.trainingLogs;
    return res.status(200).json({ message: 'Training logs retrieved successfully', trainingLogs: trainingLogs });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const markDayAsTrained = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.clientId as string);
    const { date, idRoutine } = req.body;
    const formattedDate = new Date(date);
    console.log(date, 'dateeeeeeeeee');

    console.log(formattedDate, 'req.bodyyyyy');

    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });
    if (!date) return res.status(400).json({ message: 'Date is required in the request body' });
    if (!idRoutine) return res.status(400).json({ message: 'Routine id is required in the request body' });
    const client = await Client.findByPk(userId);

    if (!client) {
      return res.status(400).json({ message: 'Client not found' });
    }

    const currentTrainingLogs = client.trainingLogs || [];
    const updatedTrainingLogs = [...currentTrainingLogs, { date: formattedDate.toISOString(), idRoutine: idRoutine }];

    client.update({
      trainingLogs: updatedTrainingLogs,
    });

    console.log(client, 'client');

    return res.status(200).json({ message: 'Day marked as trained successfully' });
  } catch (error: any) {
    console.log(error, 'error');

    return res.status(500).json({ error: error.message });
  }
};

export const markDayAsUntrained = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.clientId as string);
    const { date, idRoutine } = req.body;
    const formattedDate = new Date(date);
    console.log(idRoutine, 'idRoutine');

    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });
    if (!date) return res.status(400).json({ message: 'Date is required in the request body' });
    if (!idRoutine) return res.status(400).json({ message: 'Routine id is required in the request body' });

    const client = await Client.findByPk(userId);

    if (!client) {
      return res.status(400).json({ message: 'Client not found' });
    }

    client.trainingLogs = client.trainingLogs.filter(
      (log) => new Date(log.date).getTime() !== formattedDate.getTime() || log.idRoutine !== idRoutine
    );
    console.log(client.trainingLogs, 'client.trainingLogs');

    await client.save();

    return res.status(200).json({ message: 'Training log removed successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);

    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    const user = await get(userId);

    if (!user) return res.status(400).json({ message: 'User not found' });

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await list();

    return res.status(200).json({ users });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserRoutines = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    // Recuperar el usuario con las rutinas asociadas
    const client = await Client.findByPk(userId, {
      include: [
        {
          model: Routine,
        },
      ],
    });

    if (!client) {
      return res.status(400).json({ message: 'Client not found' });
    }
    //@ts-ignore
    return res.status(200).json({ routines: client.Routines });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    console.log(userId, 'userId');

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }
    console.log(req.body, 'req.body');

    // Validar datos antes de la actualización
    const { name, lastname, avatar } = req.body.newUser;

    if (!name && !lastname && !avatar) {
      return res.status(400).json({ error: 'No data provided for update' });
    }
    console.log(req.body, 'req.body');
    // Actualizar solo los campos proporcionados
    const updatedUser = await User.update({ name, lastname, avatar }, { where: { idUser: userId } });

    if (updatedUser[0] === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'Usuario actualizado', data: updateUser });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    //busco si el usuario tiene rutinas asociadas

    const userRoutines = await Routine.findAll({
      where: { idUser: userId },
    });

    if (userRoutines.length > 0) {
      userRoutines.forEach(async (routine) => {
        for (let groupExerciseIndex = 0; groupExerciseIndex < routine.GroupExercises.length; groupExerciseIndex++) {
          for (
            let configurationIndex = 0;
            configurationIndex < routine.GroupExercises[groupExerciseIndex].ExerciseConfigurations.length;
            configurationIndex++
          ) {
            await ExerciseConfiguration.destroy({
              where: {
                idExerciseConfiguration:
                  routine.GroupExercises[groupExerciseIndex].ExerciseConfigurations[configurationIndex].idExerciseConfiguration,
              },
              transaction,
            });
          }
          await GroupExercise.destroy({
            where: { idGroupExercise: routine.GroupExercises[groupExerciseIndex].idGroupExercise },
            transaction,
          });
        }
      });
    }

    //busco si el usuario esta adherido a algun grupo
    const clientGroup = await ClientGroup.findAll({ where: { idUser: userId } });

    if (clientGroup) {
      clientGroup.forEach(async (client) => {
        await client.destroy({ transaction: transaction });
      });
    }

    await user.destroy({ transaction: transaction });

    await transaction.commit();
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    transaction.rollback();
    return res.status(500).json({ error: error.message });
  }
};

export default { getUsers, getUser, getUserRoutines, updateUser, getClients, createClient };
