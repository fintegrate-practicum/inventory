import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitPublisherService } from './rabbit-publisher.service';

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [RabbitPublisherService],
  exports: [RabbitPublisherService], 
})
export class RabbitPublisherModule {}