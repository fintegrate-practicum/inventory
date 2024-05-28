import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import connectDB from 'connectDB/connectDB';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(3000);
	connectDB();
	
}
bootstrap();
