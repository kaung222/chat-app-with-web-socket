import { IsNotEmpty } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreatePostDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  title: string;
}
