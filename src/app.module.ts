import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComponentModule } from './component/component.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { ProviderModule } from './provider/provider.module';
import { AuthzModule } from 'fintegrate-auth';
import { PapertrailLogger } from './logger';

@Module({
  imports: [
    AuthzModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: process.env.MONGODB_URI,
      }),
      inject: [ConfigService],
    }),
    ComponentModule,
    ProductModule,
    ProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService ,PapertrailLogger],
})
export class AppModule {}
