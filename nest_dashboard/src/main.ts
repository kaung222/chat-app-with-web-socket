import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({ origin: 'http://localhost:8834', methods: 'All' });
  await app.listen(3000);
  app.enableShutdownHooks();
}
bootstrap();
