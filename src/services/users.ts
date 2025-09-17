import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const repo = () => AppDataSource.getRepository(User);

export const userService = {
  getAll: async () => {
    return await repo().find();
  },

  getById: async (id: number) => {
    return await repo().findOneBy({ id });
  },

  create: async (email: string, name: string) => {
    const exists = await repo().findOneBy({ email });
    if (exists) {
      throw { status: 409, message: 'email already exists' };
    }

    const user = repo().create({ email, name });
    return await repo().save(user);
  },

  update: async (id: number, email?: string, name?: string) => {
    const user = await repo().findOneBy({ id });
    if (!user) {
      throw { status: 404, message: 'User not found' };
    }

    if (email) user.email = email;
    if (name) user.name = name;

    return await repo().save(user);
  },

  delete: async (id: number) => {
    const result = await repo().delete(id);
    if (result.affected === 0) {
      throw { status: 404, message: 'User not found' };
    }
    return result;
  }
};
