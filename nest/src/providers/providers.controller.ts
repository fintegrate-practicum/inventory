import { Controller, Get, Param, Delete, Body, Post, Put,Headers } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { Provider } from './provider.entity';

@Controller('api/inventory/providers')
export class ProvidersController {
  constructor(private readonly ProvidersService: ProvidersService) { }

  @Get()
  getAllProviders() {
    return this.ProvidersService.getAllProviders();
  }

  @Get(':ProviderId')
  getProviderById(@Param('ProviderId') ProviderId: string) {
    return this.ProvidersService.getProviderById(ProviderId);
  }

  @Delete(':providerId')
  deleteProvider(@Headers('x-access-token') token:string,@Param('providerId') providerId: string) {
    return this.ProvidersService.deleteProvider(providerId,token);
  }

  @Post()
  addNewProvider(@Body() newProvider: Provider) {
    return this.ProvidersService.addNewProvider(newProvider);
  }

  @Put(':providerId')
  updateProvider(@Headers('x-access-token') token:string,@Param('providerId') providerId: string, @Body() updatedFields: any) {
    return this.ProvidersService.updateProvider(providerId, updatedFields,token);
  }

}
