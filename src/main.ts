import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import connectDB from './connectDB/connectDB';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { PapertrailLogger } from './logger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // הגדרת מגבלת גודל לבקשות JSON ו-URL encoded
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));  

  const papertrailLogger = app.get(PapertrailLogger);
  app.useLogger(papertrailLogger);
  await app.listen(4000);
  papertrailLogger.log('Server is running on http://localhost:4000');
  connectDB();
}
bootstrap();
