import { injectable, inject } from 'tsyringe';
import { Repository, DataSource } from 'typeorm';
import { User } from '../entity/User';
import { SERVICES } from '../common/constants/services';

@injectable()
export class UserRepository {
  private repository: Repository<User>;

  constructor(@inject(SERVICES.DATA_SOURCE) private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findByHobby(hobby: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .where(':hobby = ANY(user.hobbies)', { hobby })
      .getMany();
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    await this.repository.update(id, userData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
