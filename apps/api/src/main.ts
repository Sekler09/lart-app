import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ZodValidationPipe } from 'nestjs-zod';

const options = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true,
  allowedHeaders: 'Content-Type, Accept',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(options);
  app.use(cookieParser());
  app.useGlobalPipes(new ZodValidationPipe());
  await app.listen(3000);
}
bootstrap();
