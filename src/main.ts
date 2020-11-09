import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from 'dotenv';
import { resolve, join } from 'path';
import { AppModule } from './app.module';
import * as express from 'express';

config({ path: resolve(__dirname, `../.${process.env.NODE_ENV}.env`) });
console.log(process.env.NODE_ENV);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors();

  app.use(express.static(join(process.cwd(), '../client/dist/')));
  await app.listen(3000);
}
bootstrap();
