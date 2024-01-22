import { Routine, Exercise, RoutineHasExercise, RoutineConfiguration } from '../models/Relations';

export const list = async () => {
  try {
    return await Routine.findAll();
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const get = async (idRoutine: number) => {
  try {
    return await Routine.findOne({
      where: { idRoutine },
      include: [
        {
          model: RoutineHasExercise,
          foreignKey: 'idRoutine',
          attributes: { exclude: ['idRoutine', 'createdAt', 'updatedAt'] },
          include: [
            {
              model: Exercise,
            },
            {
              model: RoutineConfiguration,
            },
          ],
        },
      ],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const create = async () => {};

export const update = async () => {};

export const remove = async (idRoutine: number) => {
  try {
    return await Routine.destroy({ where: { idRoutine } });
  } catch (e: any) {
    throw new Error(e.message);
  }
};
module.exports = {
  list,
  get,
  create,
  update,
  remove,
};
