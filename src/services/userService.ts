// src/services/userService.ts
import { AppDataSource } from '../config/database';
import { User } from '../entity/User';
import { HTTP_STATUS } from '../constants/httpStatus';

const userRepository = AppDataSource.getRepository(User);

export const userService = {
  getAll: async (): Promise<User[]> => {
    return await userRepository.find();
  },

  getById: async (id: number): Promise<User | null> => {
    return await userRepository.findOne({ where: { id } });
  },

  getByHobby: async (hobbyName: string): Promise<User[]> => {
    return await userRepository
      .createQueryBuilder('user')
      .where('user.hobbies LIKE :hobby', { hobby: `%${hobbyName}%` })
      .getMany();
  },

  create: async (email: string, name: string, hobbies: string[]): Promise<User> => {
    const existing = await userRepository.findOne({ where: { email } });
    if (existing) {
      throw { status: HTTP_STATUS.CONFLICT, message: 'email already exists' };
    }

    const user = userRepository.create({ email, name, hobbies });
    return await userRepository.save(user);
  },

  update: async (id: number, email: string, name: string, hobbies?: string[]): Promise<User> => {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      throw { status: HTTP_STATUS.NOT_FOUND, message: 'User not found' };
    }

    user.email = email;
    user.name = name;
    if (hobbies !== undefined) {
      user.hobbies = hobbies;
    }
    return await userRepository.save(user);
  },

  delete: async (id: number): Promise<void> => {
    const result = await userRepository.delete(id);
    if (result.affected === 0) {
      throw { status: HTTP_STATUS.NOT_FOUND, message: 'User not found' };
    }
  }
};