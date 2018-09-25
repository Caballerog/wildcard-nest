import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 16, unique: true })
  name: string;
  @Column({ length: 512 })
  password: string;
}
