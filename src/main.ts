import { NestFactory } from '@nestjs/core';
import { AppModule, AppExceptionHandler } from './app';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new AppExceptionHandler());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3050);
}
bootstrap();
