import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   @IsNotEmpty()
  @Column()
  body: string;

  //   @IsNotEmpty()
  @Column()
  title: string;
}
