import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaErrorExceptionFilter } from './prisma-error/prisma-error.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  app.useGlobalFilters(new PrismaErrorExceptionFilter());
  await app.listen(3000);
}
bootstrap();
