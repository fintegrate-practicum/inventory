import { Controller, Get, Param, Delete, Body, Post, Put, Headers } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { Provider } from './provider.entity';

@Controller('inventory/provider')
export class ProviderController {
  constructor(private readonly ProviderService: ProviderService) {}

  @Get()
  getAllProviders() {
    return this.ProviderService.getAllProviders();
  }

  @Get(':ProviderId')
  getProviderById(@Param('ProviderId') ProviderId: string) {
    return this.ProviderService.getProviderById(ProviderId);
  }

  @Delete(':providerId')
  deleteProvider(
    @Headers('x-access-token') token: string,
    @Param('providerId') providerId: string,
  ) {
    return this.ProviderService.deleteProvider(providerId, token);
  }

  @Post()
  addNewProvider(@Body() newProvider: Provider) {
    return this.ProviderService.addNewProvider(newProvider);
  }

  @Put(':providerId')
  updateProvider(
    @Headers('x-access-token') token: string,
    @Param('providerId') providerId: string,
    @Body() updatedFields: any,
  ) {
    return this.ProviderService.updateProvider(providerId, updatedFields, token);
  }
}
