import { AppDataSource } from '../config/database';
import { User } from '../entity/User';
import { NotFoundError, ConflictError, BadRequestError } from '@map-colonies/error-types';
import { EmailValidator } from '../validators/emailValidator';

const userRepository = AppDataSource.getRepository(User);

export const userService = {
  getAll: async (): Promise<User[]> => {
    return await userRepository.find();
  },

  getById: async (id: number): Promise<User> => {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return user;
  },

  getByHobby: async (hobbyName: string): Promise<User[]> => {
    return await userRepository
      .createQueryBuilder('user')
      .where('user.hobbies LIKE :hobby', { hobby: `%${hobbyName}%` })
      .getMany();
  },

  create: async (email: string, name: string, hobbies: string[]): Promise<User> => {
    try {
      EmailValidator.validate(email);
    } catch (error) {
      throw new BadRequestError((error as Error).message);
    }

    const existing = await userRepository.findOne({ where: { email } });
    if (existing) {
      throw new ConflictError(`User with email ${email} already exists`);
    }

    const user = userRepository.create({ email, name, hobbies });
    return await userRepository.save(user);
  },

  update: async (id: number, email: string, name: string, hobbies?: string[]): Promise<User> => {
    try {
      EmailValidator.validate(email);
    } catch (error) {
      throw new BadRequestError((error as Error).message);
    }

    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
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
      throw new NotFoundError(`User with id ${id} not found`);
    }
  }
};