/* eslint-disable camelcase */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_sales')
class UserSales {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  preferences: string;

  @Column()
  contact: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default UserSales;
