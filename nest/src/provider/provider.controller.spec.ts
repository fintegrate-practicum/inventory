import { Test, TestingModule } from '@nestjs/testing';
import { ProviderController } from './Provider.controller';
import { Provider, ProviderSchema } from './Provider.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ProviderService } from './Provider.service';

describe('ProviderController', () => {
    let controller: ProviderController;
    let providerModel: Model<Provider>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProviderController],
            providers: [
                ProviderService,
                {
                    provide: getModelToken(Provider.name),
                    useFactory: () => {
                        const mongoose = require('mongoose');
                        return mongoose.model(Provider.name, ProviderSchema);
                    },
                },
            ],
        }).compile();

        controller = module.get<ProviderController>(ProviderController);
        providerModel = module.get<Model<Provider>>(getModelToken(Provider.name));
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

});
