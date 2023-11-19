import { Body, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  create(@Body() createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    // const exitInCache = await this.cacheManager.get('users');
    // if (exitInCache) {
    //   return exitInCache;
    // }
    const users = await this.userRepository.find({
      select: {
        id: true,
        email: true,
        role: true,
      },
      // skip: 2 * 2,
      order: { email: 'asc' },
      // take: 2,
    });
    // const value = await this.cacheManager.set('users', users, 1000);
    return users;
    // const total = Number(users.length);
    // const pageLimit = 10;
    // const totalPage = Math.ceil(total / pageLimit);
    // return { message: 'successfull', users, total, totalPage };
  }

  async findOne(id: string) {
    // return id;

    const user = await this.userRepository.findOneBy({
      email: 'jamesmarcus@gmail.co',
    });
    // if (!user) return { message: 'user not found', statusCode: 404 };
    return user;
  }

  // @Cron('2 * * * * *')
  // run() {
  //   console.log('run');
  // }

  update(id: string, updateUserDto: UpdateUserDto) {
    console.log(id);

    // return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete({
      id: In([
        'cacce1b0-3d17-4b37-862a-e024806996ce',
        'b806035c-7da3-4a1c-b191-6012f30917d6',
      ]),
    });
  }
}
