import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  @Index('IDX_USER_EMAIL')
  email!: string;

  @Column('simple-array', { default: '' })
  hobbies!: string[];
}