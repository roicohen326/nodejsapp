import { injectable, inject } from 'tsyringe';
import { User } from '../entity/User';
import { UserRepository } from '../repositories/UserRepository';
import { SERVICES } from '../common/constants/services';
import { Logger } from '@map-colonies/js-logger';
import { NotFoundError, ConflictError } from '@map-colonies/error-types';

@injectable()
export class UserService {
  constructor(
    @inject(SERVICES.USER_REPOSITORY) private userRepository: UserRepository,
    @inject(SERVICES.LOGGER) private logger: Logger
  ) {}

  async getAllUsers(): Promise<User[]> {
    this.logger.info('Fetching all users');
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User> {
    this.logger.info({ userId: id }, 'Fetching user by ID');
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      this.logger.warn({ userId: id }, 'User not found');
      throw new NotFoundError(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async getUsersByHobby(hobby: string): Promise<User[]> {
    this.logger.info({ hobby }, 'Fetching users by hobby');
    return this.userRepository.findByHobby(hobby);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    this.logger.info({ email: userData.email }, 'Creating new user');
    
    const existingUser = await this.userRepository.findByEmail(userData.email!);
    if (existingUser) {
      this.logger.warn({ email: userData.email }, 'User already exists');
      throw new ConflictError(`User with email ${userData.email} already exists`);
    }
    
    const user = await this.userRepository.create(userData);
    this.logger.info({ userId: user.id }, 'User created successfully');
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    this.logger.info({ userId: id }, 'Updating user');
    
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      this.logger.warn({ userId: id }, 'User not found for update');
      throw new NotFoundError(`User with ID ${id} not found`);
    }

    if (userData.email && userData.email !== existingUser.email) {
      const emailExists = await this.userRepository.findByEmail(userData.email);
      if (emailExists) {
        this.logger.warn({ email: userData.email }, 'Email already in use');
        throw new ConflictError(`Email ${userData.email} is already in use`);
      }
    }

    const updatedUser = await this.userRepository.update(id, userData);
    this.logger.info({ userId: id }, 'User updated successfully');
    return updatedUser!;
  }

  async deleteUser(id: number): Promise<void> {
    this.logger.info({ userId: id }, 'Deleting user');
    
    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      this.logger.warn({ userId: id }, 'User not found for deletion');
      throw new NotFoundError(`User with ID ${id} not found`);
    }
    
    this.logger.info({ userId: id }, 'User deleted successfully');
  }
}
