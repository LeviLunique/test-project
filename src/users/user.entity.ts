import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Column()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
