import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Provider } from './provider.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// /////////////// for example only/////////////////////////
@Injectable()
export class ProviderService {

    constructor(@InjectModel(Provider.name) private readonly providerModel: Model<Provider>) { }

    async getProviderById(providerId: string): Promise<Provider> {
        const provider = await this.providerModel.findOne({ id: providerId, isActive: true });
        if (!provider) {
            throw new NotFoundException('Provider not found.');
        }

        return provider;
    }

    async updateProvider(providerId: string, updatedFields: any, businessId: string): Promise<void> {
        // adminId-token
        const provider = await this.providerModel.findOne({ id: providerId });

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

        await this.providerModel.create(provider);
    }

    async getAllProviders(): Promise<Provider[]> {

        const providers = await this.providerModel.find({ isActive: true });

        return providers;
    }

    async deleteProvider(providerId: string, businessId: string): Promise<void> {
        // adminId-token
        const provider = await this.providerModel.findOne({ id: providerId });
        if (!provider) {
            throw new NotFoundException('Provider not found.');
        }

        if (provider.businessId !== businessId) {
            throw new ForbiddenException('You are not authorized to delete this provider.');
        }

        provider.isActive = false;
        await this.providerModel.create(provider);
    }

    async addNewProvider(providerData: Provider): Promise<Provider> {

        const savedProvider = await this.providerModel.create(providerData);

        return savedProvider;
    }

}
