import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComponentModule } from './component/component.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { ProviderModule } from './provider/provider.module';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: '.env' }),
		MongooseModule.forRoot(process.env.MONGO_URI),

		ComponentModule, ProductModule, ProviderModule],
	controllers: [AppController],
	providers: [AppService],

})
export class AppModule {

}
