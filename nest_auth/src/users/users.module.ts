import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CacheModule.register()],
  controllers: [UsersController],
  providers: [UsersService],
  // exports: [UsersService],
})
export class UsersModule {}
