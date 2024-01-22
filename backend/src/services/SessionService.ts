import Session from '../models/Session';

export const create = async (jwt: string, idCredential: number) => {
  try {
    return await Session.create({
      token: jwt,
      created_date: new Date(),
      updated_date: new Date(),
      idCredential: idCredential,
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const remove = async (token: string) => {
  try {
    return await Session.destroy({ where: { token } });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const find = async (idCredential: number) => {
  try {
    return await Session.findOne({ where: { idCredential: idCredential } });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

module.exports = {
  create,
  remove,
  find,
};
