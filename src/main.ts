import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import connectDB from './connectDB/connectDB';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
  console.log('Server is running on http://localhost:4000');
  connectDB();
}
bootstrap();
