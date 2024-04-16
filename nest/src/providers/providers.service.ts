


import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';


@Injectable()
export class ProvidersService {

  constructor(private readonly providerRepository: ProviderRepository) { }

  async getProvidersById(providerId: string): Promise<any[]> {
    const provider = await this.providerRepository.findOne(providerId);
    if (!provider) {
      throw new NotFoundException('Provider not found.');
    }

    return provider;
  }

  async updateProvider(providerId: string, updatedFields: any, managerId: string): Promise<void> {

    const provider = await this.providerRepository.findOne(providerId);

    if (!provider) {
      throw new NotFoundException('Provider not found.');
    }
    if (!provider.isActive) {
      throw new NotFoundException('Provider is deleted.');
    }

    if (provider.ownerId !== managerId) {
      throw new ForbiddenException('You are not authorized to update this provider.');
    }
    Object.assign(provider, updatedFields);

    await this.providerRepository.save(provider);
  }

  async getProvidersByBusinessId(businessId: string): Promise<any[]> {

    const providers = await this.providerRepository.find({ businessId, isActive: true });

    return providers;
  }

  async deleteProvider(providerId: string, deleterId: string, isAdmin: boolean): Promise<void> {

    if (!isAdmin) {
      throw new ForbiddenException('Only administrators can delete providers.');
    }

    const provider = await this.providerRepository.findOne(providerId);
    if (!provider) {
      throw new NotFoundException('Provider not found.');
    }

    if (provider.ownerId !== deleterId) {
      throw new ForbiddenException('You are not authorized to delete this provider.');
    }

    provider.deleted = true;
    await this.providerRepository.save(provider);
  }

  async addNewProvider(providerData: any): Promise<any> {

    const savedProvider = await this.providerRepository.save(providerData);

    return savedProvider;
  }

}
