import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import connectDB from './connectDB/connectDB';
import * as dotenv from 'dotenv';
import { PapertrailLogger } from '../logger/logger.service';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const papertrailLogger = app.get(PapertrailLogger);
  app.useLogger(papertrailLogger);
  await app.listen(4000);
  console.log('Server is running on http://localhost:4000');
  connectDB();
}
bootstrap();
