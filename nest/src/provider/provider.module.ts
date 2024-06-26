import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { Provider, ProviderSchema } from './provider.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: Provider.name, schema: ProviderSchema }]),],
    controllers: [ProviderController],
    providers: [ProviderService],
})
export class ProviderModule { }