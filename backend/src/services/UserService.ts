import User from '../models/User';
import Routine from '../models/Routine';
import Client from '../models/Client';
import Credential from '../models/Credential';
import Coach from '../models/Coach';
import ClientGroup from '../models/ClientGroup';

export const get = async (idUser: number) => {
  try {
    return await User.findByPk(idUser, {
      include: [
        {
          model: Credential,
          attributes: {
            exclude: ['password', 'idUser'],
          },
        },
        {
          model: Client,
          include: [
            {
              model: ClientGroup,
            },
          ],
        },
      ],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const list = async () => {
  try {
    return await User.findAll({
      include: [{ model: Credential, attributes: { exclude: ['password', 'idUser', 'created_date', 'updated_date'] } }],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const listClients = async () => {
  try {
    return await Client.findAll({
      include: [
        {
          model: User,
          include: [{ model: Credential, attributes: { exclude: ['password', 'idUser', 'created_date', 'updated_date'] } }],
        },
      ],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const listCoaches = async () => {
  try {
    return await Coach.findAll({
      include: [
        {
          model: User,
          include: [{ model: Credential, attributes: { exclude: ['password', 'idUser', 'created_date', 'updated_date'] } }],
        },
      ],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getRoutines = async (idUser: number) => {
  try {
    return await Client.findByPk(idUser, {
      include: [
        {
          model: Routine,
        },
      ],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const remove = async (idUser: number) => {
  try {
    return await User.destroy({ where: { idUser } });
  } catch (e: any) {
    throw new Error(e.message);
  }
};
