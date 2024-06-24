import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Provider } from './provider.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// /////////////// for example only/////////////////////////
@Injectable()
export class ProvidersService {

  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>) { }

  async getProviderById(providerId: string): Promise<Provider> {
    const provider = await this.providerRepository.findOneBy({id:providerId,isActive:true});
    if (!provider) {
      throw new NotFoundException('Provider not found.');
    }

    return provider;
  }

  async updateProvider(providerId: string, updatedFields: any,businessId:string): Promise<void> {
    // adminId-token
    const provider = await this.providerRepository.findOneBy({id:providerId});

    if (!provider) {
      throw new NotFoundException('Provider not found.');
    }
    if (!provider.isActive) {
      throw new NotFoundException('Provider is deleted.');
    }

    if (provider.businessId !== businessId) {
      throw new ForbiddenException('You are not authorized to update this provider.');
    }
    Object.assign(provider, updatedFields);

    await this.providerRepository.save(provider);
  }

  async getAllProviders(): Promise<Provider[]> {

    const providers = await this.providerRepository.findBy({ isActive: true });

    return providers;
  }

  async deleteProvider(providerId: string,businessId:string): Promise<void> {
    // adminId-token
    

    const provider = await this.providerRepository.findOneBy({id:providerId});
    if (!provider) {
      throw new NotFoundException('Provider not found.');
    }

    if (provider.businessId !== businessId) {
      throw new ForbiddenException('You are not authorized to delete this provider.');
    }

    provider.isActive = false;
    await this.providerRepository.save(provider);
  }

  async addNewProvider(providerData: Provider): Promise<any> {

    const savedProvider = await this.providerRepository.save(providerData);

    return savedProvider;
  }

}
