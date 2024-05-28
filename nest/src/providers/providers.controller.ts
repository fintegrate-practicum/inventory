

// import { Controller, Get, Param, Delete, Body, Post, Put } from '@nestjs/common';
// import { ProvidersService } from './providers.service';


// @Controller('api/inventory/providers')
// export class ProvidersController {
//   constructor(private readonly ProvidersService: ProvidersService) { }

//   @Get()
//   getAllProviders() {
//     return this.ProvidersService.getAllProviders();
//   }

//   @Get(':ProviderId')
//   getProvidersById(@Param('ProviderId') ProviderId: string) {
//     return this.ProvidersService.getProvidersById(ProviderId);
//   }

//   @Delete(':providerId')
//   deleteProvider(@Param('providerId') providerId: string) {
//     return this.ProvidersService.deleteProvider(providerId);
//   }

//   @Post()
//   addNewProvider(@Body() newProvider: any) {
//     return this.ProvidersService.addNewProvider(newProvider);
//   }

//   @Put(':providerId')
//   updateProvider(@Param('providerId') providerId: string, @Body() updatedFields: any) {
//     return this.ProvidersService.updateProvider(providerId, updatedFields);
//   }

// }
