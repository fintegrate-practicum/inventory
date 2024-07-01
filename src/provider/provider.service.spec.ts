import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ProviderService } from './Provider.service';
import { Provider } from './Provider.entity';

describe('ProviderService', () => {
    let service: ProviderService;
    let ProviderModel: Model<Provider>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProviderService,
                {
                    provide: getModelToken(Provider.name),
                    useValue: {
                        findOne: jest.fn(),
                        findOneBy: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        manager: {
                            getRepository: jest.fn(() => ProviderModel),
                        }
                    },
                },
            ],
        }).compile();

        service = module.get<ProviderService>(ProviderService);
        ProviderModel = module.get<Model<Provider>>(getModelToken(Provider.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

});
