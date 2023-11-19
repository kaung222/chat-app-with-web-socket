import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async signIn(userDto: { email: string; password: string }) {
    const user = await this.userRepository.findOneBy({ email: userDto.email });
    // return user;
    if (!user) {
      throw new NotFoundException();
    }

    const isMatch = await bcrypt.compare(userDto.password, user.password);
    if (isMatch) {
      const payload = { email: user.email, userRole: 'admin' };
      const accessToken = this.jwtService.sign(payload);
      return { user, accessToken };
    } else {
      throw new ForbiddenException();
    }
  }

  async signUp(userDto: CreateUserDto) {
    const { email, password, role } = userDto;
    const hashedPassword = await this.hashPassword(password);
    const user = await this.userRepository.save({
      password: hashedPassword,
      email,
      role,
    });

    const payload = { email: email, userRole: 'admin' };
    return { ...user, accessToken: this.jwtService.sign(payload) };
  }
}
