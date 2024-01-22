import Client from '../models/Client';
import ClientGroup from '../models/ClientGroup';

import Exercise from '../models/Exercise';
import Group from '../models/Group';
import Routine from '../models/Routine';
import User from '../models/User';

export const list = async () => {
  try {
    return await Group.findAll({
      include: [
        {
          model: ClientGroup,
          include: [
            {
              model: Client,
              include: [
                {
                  model: User,
                  attributes: { exclude: ['idUser'] },
                },
              ],
            },
          ],
        },
      ],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const get = async (idGroup: number) => {
  try {
    return await Group.findByPk(idGroup, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: ClientGroup,
          include: [
            {
              model: Client,
              include: [
                {
                  model: User,
                  attributes: { exclude: ['idUser'] },
                },
              ],
            },
          ],
        },
      ],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const create = async (idGroup: number) => {};

export const update = async (idGroup: number) => {};

export const remove = async (idGroup: number) => {
  try {
    return await Group.destroy({ where: { idGroup } });
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
