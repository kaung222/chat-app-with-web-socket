import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  @InjectRepository(PostEntity)
  private readonly postRepository: Repository<PostEntity>;
  async create(createPostDto: CreatePostDto) {
    const post = await this.postRepository.save({
      ...createPostDto,
      owner: 'gg',
    });
    return post;
  }

  findAll() {
    // return this.postRepository.find();
    return 'hello';
  }

  findOne(id: string) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return this.postRepository.delete(id);
  }
}
