

import { Controller, Get, Param, Delete, Body, Post, Put } from '@nestjs/common';
import { ProvidersService } from './providers.service';


@Controller('api/inventory/providers')
export class ProvidersController {
  constructor(private readonly ProvidersService: ProvidersService) { }

  @Get(':businessId')
  getProvidersByBusinessId(@Param('businessId') businessId: string) {
    return this.ProvidersService.getProvidersByBusinessId(businessId);
  }

  @Get('allproviders/:ProviderId')
  getProvidersById(@Param('ProviderId') ProviderId: string) {
    return this.ProvidersService.getProvidersById(ProviderId);
  }

  @Delete(':providerId')
  deleteProvider(@Param('providerId') providerId: string, @Body() deleterId: string, isAdmin: boolean) {
    return this.ProvidersService.deleteProvider(providerId, deleterId, isAdmin);
  }

  @Post()
  addNewProvider(@Body() newProvider: any) {
    return this.ProvidersService.addNewProvider(newProvider);
  }

  @Put(':providerId')
  updateProvider(@Param('providerId') providerId: string, @Body() updatedFields: any, userId: string) {
    return this.ProvidersService.updateProvider(providerId, updatedFields, userId);
  }

}
