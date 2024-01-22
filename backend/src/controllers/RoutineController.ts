//@ts-nocheck
import { Request, Response } from 'express';
import sequelize from '../configs/db';
import Routine from '../models/Routine';
import GroupExercise from '../models/GroupExercise';
import Exercise from '../models/Exercise';
import Client from '../models/Client';
import ExerciseConfiguration from '../models/ExerciseConfiguration';

export const createRoutine = async (req: Request, res: Response) => {
  try {
    //idClient aca esta mal, es el idUser el que esta llegando
    const { name, observation, objective, exercisesGroup, idClient, startDate, endDate } = req.body;

    const transaction = await sequelize.transaction();

    try {
      const client = await Client.findOne({ where: { idClient } });

      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      const routine = await Routine.create(
        {
          name,
          observation,
          objective,
          startDate,
          endDate,
          idClient,
        },
        { transaction }
      );

      const groups = Object.entries(exercisesGroup);
      for (const [groupKey, groupValue] of groups) {
        const exercises = Object.entries(groupValue);
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

      //TODO: ClientHasRoutine hace falta agregar?
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

export const updateRoutine = async (req: Request, res: Response) => {
  console.log('ESTOY UPDATEANDO');

  try {
    const routineId = parseInt(req.params.routineId as string);
    if (!routineId || isNaN(routineId)) return res.status(400).json({ message: 'Routine id is required' });

    const { name, observation, objective, exercisesGroup, idClient, startDate, endDate } = req.body;

    const transaction = await sequelize.transaction();

    try {
      const routine = await Routine.findByPk(routineId, {
        transaction,
        include: [
          {
            model: GroupExercise,
            include: [
              {
                model: ExerciseConfiguration,
                include: [
                  {
                    model: Exercise,
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!routine) {
        return res.status(404).json({ message: 'Routine not found' });
      }

      //En este for, destruyo todas las configuraciones de ejercicios de cada grupo de ejercicios
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

      //Ahora, creo todo desde 0.
      const groups = Object.entries(exercisesGroup);
      for (const [groupKey, groupValue] of groups) {
        const exercises = Object.entries(groupValue);
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

      //Finalmente updateo los valores de la rutina
      await routine.update(
        {
          name,
          observation,
          objective,
          startDate,
          endDate,
          idClient: idClient,
        },
        { transaction }
      );
      await transaction.commit();

      res.status(200).json({ message: 'Routine updated successfully', routine });
    } catch (error: any) {
      await transaction.rollback();
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateRoutineConfiguration = async (req: Request, res: Response) => {
  console.log('ESTOY UPDATEANDO CONFIGURACIÓN DE EJERCICIO EN RUTINA');

  try {
    const routineId = parseInt(req.params.routineId as string);
    console.log(routineId, 'routineId');
    console.log(req.body, 'req.body');

    if (!routineId || isNaN(routineId)) return res.status(400).json({ message: 'Routine id is required' });

    const { exerciseId, day, configuration } = req.body;

    const transaction = await sequelize.transaction();

    try {
      const routine = await Routine.findByPk(routineId, {
        transaction,
        include: [
          {
            model: GroupExercise,
            include: [
              {
                model: ExerciseConfiguration,
                include: [
                  {
                    model: Exercise,
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!routine) {
        return res.status(404).json({ message: 'Routine not found' });
      }

      // Buscar el grupo de ejercicio correspondiente al día
      const groupExercise = await GroupExercise.findOne({
        where: {
          idRoutine: routine.idRoutine,
          day: day,
        },
        transaction,
      });

      if (!groupExercise) {
        return res.status(404).json({ message: 'Group Exercise not found for the specified day' });
      }

      // Buscar la configuración de ejercicio correspondiente al ejercicio y al grupo de ejercicio
      const exerciseConfiguration = await ExerciseConfiguration.findOne({
        where: {
          idExercise: exerciseId,
          idGroupExercise: groupExercise.idGroupExercise,
        },
        transaction,
      });

      if (!exerciseConfiguration) {
        return res.status(404).json({ message: 'Exercise Configuration not found for the specified exercise and day' });
      }
      console.log(configuration, 'configurationnnnnnnnnnnnnnnnnnnnnnnnnnnn');

      const updatedProperties = Object.keys(configuration).reduce((acc, key) => {
        if (
          configuration[key] !== undefined &&
          configuration[key] !== null &&
          configuration[key] !== '' &&
          configuration[key] !== 0
        ) {
          acc[key] = configuration[key];
        }
        return acc;
      }, {});

      await exerciseConfiguration.update(updatedProperties, { transaction });

      await transaction.commit();

      res.status(200).json({ message: 'Exercise Configuration updated successfully', exerciseConfiguration });
    } catch (error: any) {
      await transaction.rollback();
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRoutines = async (_req: Request, res: Response) => {
  try {
    const routines = await Routine.findAll({
      include: [
        {
          model: GroupExercise,
          include: [
            {
              model: Exercise,
              include: [ExerciseConfiguration], // Incluye configuraciones de ejercicio
            },
          ],
        },
      ],
    });
    return res.status(200).json({ routines });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRoutine = async (req: Request, res: Response) => {
  try {
    const routineId = parseInt(req.params.routineId as string);
    if (!routineId || isNaN(routineId)) return res.status(400).json({ message: 'Routine id is required' });

    const routine = await Routine.findByPk(routineId, {
      include: [
        {
          model: GroupExercise,
          include: [
            {
              model: ExerciseConfiguration,
              include: [
                {
                  model: Exercise,
                },
              ],
            },
          ],
        },
      ],
    });

    if (!routine) return res.status(404).json({ message: 'Routine not found' });
    return res.status(200).json({ routine });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteRoutine = async (req: Request, res: Response) => {
  try {
    const routineId = parseInt(req.params.routineId as string);
    if (!routineId || isNaN(routineId)) return res.status(400).json({ message: 'Routine id is required' });

    const transaction = await sequelize.transaction();

    try {
      const routine = await Routine.findByPk(routineId);

      if (!routine) {
        return res.status(404).json({ message: 'Routine not found' });
      }

      await routine.destroy({ transaction });

      await transaction.commit();

      res.status(200).json({ message: 'Routine deleted successfully' });
    } catch (error: any) {
      await transaction.rollback();
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
