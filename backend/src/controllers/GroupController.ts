// controllers/GroupController.ts

import { Request, Response } from 'express';
import Group from '../models/Group';
import Routine from '../models/Routine';
import Client from '../models/Client';
import sequelize from '../configs/db';

import { get, list } from '../services/GroupService';
import ClientGroup from '../models/ClientGroup';
import ExerciseConfiguration from '../models/ExerciseConfiguration';
import GroupExercise from '../models/GroupExercise';
import Exercise from '../models/Exercise';
// Crear un grupo con clientes asignados
// controllers/groupController.js

//@TODO: Migrar el contenido de este controller a un Service.
export const createGroup = async (req: Request, res: Response) => {
  try {
    const transaction = await sequelize.transaction();
    try {
      const { groupName, selectedUsers } = req.body;
      console.log(req.body, 'req.body');

      if (!groupName) {
        return res.status(400).json({ message: 'Group name is required in the request body' });
      }

      if (!selectedUsers || selectedUsers.length === 0) {
        return res.status(400).json({ message: 'At least one user must be selected' });
      }

      const name = groupName;

      const group = await Group.create({ name }, { transaction: transaction });

      // Asociar clientes al grupo
      if (group.idGroup) {
        console.log(group.idGroup, 'group.idGroup');
        console.log(selectedUsers, 'selectedUsers');

        for (const idClient of selectedUsers) {
          console.log(typeof idClient, 'idClient');

          const client = await Client.findByPk(idClient); // Obtener instancia de Client

          if (client) {
            await group.addClient(client, { transaction: transaction });
          } else {
            console.log(`Client with id ${idClient} not found`);
          }
        }
      } else {
        console.log('No se ha creado el grupo');
      }

      // Commit de la transacción
      await transaction.commit();

      return res.status(201).json({ message: 'Group created successfully', group });
    } catch (error) {
      // Revertir la transacción en caso de error
      console.error(error);
      await transaction.rollback();

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Obtener un grupo con todos los clientes
export const getGroup = async (req: Request, res: Response) => {
  try {
    const idGroup = parseInt(req.params.idGroup, 10);
    console.log(idGroup, 'idGroup');

    const group = await get(idGroup);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json({ group });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Obtener todos los grupos con sus clientes
export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await list();

    return res.status(200).json({ groups });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getGroupRoutines = async (req: Request, res: Response) => {
  try {
    const idGroup = parseInt(req.params.idGroup as string);
    if (!idGroup || isNaN(idGroup)) return res.status(400).json({ message: 'Group id is required' });

    // Recuperar el usuario con las rutinas asociadas
    const group = await Group.findByPk(idGroup, {
      include: [
        {
          model: Routine,
        },
      ],
    });

    if (!group) {
      return res.status(400).json({ message: 'Group not found' });
    }
    //@ts-ignore
    return res.status(200).json({ routines: group.Routines });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

//@TODO: Migrar el contenido de este controller a un Service.

export const setRoutineGroup = async (req: Request, res: Response) => {
  try {
    //idClient aca esta mal, es el idUser el que esta llegando
    const { name, observation, objective, exercisesGroup, idGroup, startDate, endDate } = req.body;
    console.log(req.body, 'req.body');

    const transaction = await sequelize.transaction();

    try {
      const group = await Group.findOne({ where: { idGroup } });

      if (!group) {
        return res.status(404).json({ message: 'Client not found' });
      }

      const routine = await Routine.create(
        {
          name,
          observation,
          objective,
          startDate,
          endDate,
          idGroup,
        },
        { transaction }
      );

      const groups = Object.entries(exercisesGroup);
      for (const [groupKey, groupValue] of groups) {
        const exercises = Object.entries(groupValue!);
        if (exercises.length !== 0) {
          const groupExercise = await GroupExercise.create(
            {
              idRoutine: routine.idRoutine,
              day: groupKey,
            },
            { transaction }
          );
          for (const [exerciseKey, exerciseValue] of exercises) {
            const exercise = await Exercise.findByPk(exerciseValue.idExercise);
            if (!exercise) {
              return res.status(404).json({ message: 'Exercise not found' });
            }
            await ExerciseConfiguration.create(
              {
                repetitions: exerciseValue.configuration.repetitions,
                series: exerciseValue.configuration.series,
                weight: exerciseValue.configuration.weight,
                progressWeight: exerciseValue.configuration.progressWeight,
                idExercise: exercise.idExercise,
                idGroupExercise: groupExercise.idGroupExercise,
                order: exerciseKey,
              },
              { transaction }
            );
          }
        }
      }

      await transaction.commit();
      return res.status(201).json({ message: 'Routine created successfully', routine });
    } catch (error: any) {
      await transaction.rollback();
      console.error(error);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteGroup = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  try {
    const idGroup = parseInt(req.params.idGroup, 10);

    const group = await Group.findByPk(idGroup);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const groupRoutine = await Routine.findOne({ where: { idGroup: idGroup } });

    if (groupRoutine) {
      groupRoutine.destroy({ transaction: transaction });
    }

    const clientGroup = await ClientGroup.findAll({ where: { idGroup: idGroup }, transaction });

    if (clientGroup) {
      clientGroup.forEach(async (client) => {
        await client.destroy({ transaction: transaction });
      });
    }

    await group.destroy({ transaction: transaction });

    transaction.commit();
    return res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    transaction.rollback();
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteUserFromGroup = async (req: Request, res: Response) => {
  try {
    console.log(req.body, 'req.body');
    const idGroup = parseInt(req.params.idGroup, 10);
    const { idClient } = req.body;

    const group = await Group.findByPk(idGroup);

    if (!group) {
      console.log('Group not found');

      return res.status(404).json({ message: 'Group not found' });
    }

    const clientGroup = await ClientGroup.findOne({
      where: { idGroup, idClient },
    });

    if (clientGroup) {
      await clientGroup.destroy();
      return res.status(200).json({ message: 'User deleted from group successfully' });
    } else {
      console.log('User not found in the group');

      return res.status(404).json({ message: 'User not found in the group' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const addUserToGroup = async (req: Request, res: Response) => {
  try {
    const idGroup = parseInt(req.params.idGroup, 10);
    const { idClient } = req.body;

    const group = await Group.findByPk(idGroup);

    if (!group) {
      console.log('Group not found');

      return res.status(404).json({ message: 'Group not found' });
    }

    const client = await Client.findByPk(idClient);

    if (!client) {
      console.log('Client not found');

      return res.status(404).json({ message: 'Client not found' });
    }

    const clientGroup = await ClientGroup.findOne({
      where: { idGroup, idClient },
    });

    if (clientGroup) {
      console.log('User already in the group');

      return res.status(404).json({ message: 'User already in the group' });
    }

    await group.addClient(client);

    return res.status(200).json({ message: 'User added to group successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
