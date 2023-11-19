import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMiddleWare } from './middlewares/user.middleware';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { CourseModule } from './app/course/course.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    CacheModule.register(),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 6000, limit: 2 }]),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PostsModule,
    AuthModule,
    CourseModule,
  ],
  providers: [ChatGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleWare)
      .forRoutes({ path: 'users', method: RequestMethod.ALL });
  }
}
