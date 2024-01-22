import Credential from '../models/Credential';
import User from '../models/User';

export const isRegistered = async (email: string) => {
  try {
    return await Credential.findOne({ where: { email } });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const create = async (email: string, password: string, name: string, lastname: string, avatar: string) => {
  try {
    return await Credential.create(
      {
        email: email,
        password: password,
        created_date: new Date(),
        updated_date: new Date(),
        User: {
          name: name,
          lastname: lastname,
          avatar: avatar,
          created_date: new Date(),
          updated_date: new Date(),
        },
      },
      {
        include: [User],
      }
    );
  } catch (e: any) {
    throw new Error(e.message);
  }
};
