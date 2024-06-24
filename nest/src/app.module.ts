// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
// 	imports: [],
// 	controllers: [AppController],
// 	providers: [AppService],
// })
// export class AppModule {}
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';

// @Module({
//   imports: [MongooseModule.forRoot('mongodb://localhost:27017/inventory')],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/inventory'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}