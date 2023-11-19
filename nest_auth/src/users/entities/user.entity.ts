import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ default: '', nullable: false })
  email: string;

  @IsEnum(['user', 'admin'])
  @Column({ default: 'user', nullable: false, enum: ['user', 'admin'] })
  role: string;

  @IsNotEmpty()
  @Exclude()
  @Column({ default: '', nullable: false })
  password: string;
}
