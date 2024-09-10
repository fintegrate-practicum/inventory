import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitPublisherService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly nameExchange: string = 'message_exchange';
  private readonly nameQueue: string = 'message_queue';

  constructor(private configService: ConfigService) {
    this.connectToRabbitMQ();
    console.log('connected to rabbit');
  }

  async connectToRabbitMQ() {
    try {
      const amqpUrl = `amqp://${this.configService.get('AMQP_HOST')}:${this.configService.get('AMQP_PORT')}`;
      const username = this.configService.get('AMQP_USERNAME');
      const password = this.configService.get('AMQP_PASSWORD');
      const connectionOptions: amqp.Options.Connect = {
        username,
        password,
      };

      this.connection = await amqp.connect(amqpUrl, connectionOptions);
      this.channel = await this.connection.createChannel();

      await this.initializeRabbitMQ();
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }

  async initializeRabbitMQ(): Promise<void> {
    try {
      await this.channel.assertExchange(this.nameExchange, 'direct', {
        durable: false,
      });
      await this.channel.assertQueue(this.nameQueue, { durable: true });
      await this.channel.bindQueue(
        this.nameQueue,
        this.nameExchange,
        'message_type',
      );
    } catch (error) {
      console.error('Error initializing RabbitMQ:', error);
    }
  }

  async publishMessageToCommunication(message: any): Promise<void> {
    try {
      const exchangeName = this.nameExchange; // Use the correct exchange name
      const messageData = JSON.stringify(message);

      this.channel.publish(
        exchangeName,
        'message_type',
        Buffer.from(messageData),
      );
      console.log(`Message published to exchange :  ${exchangeName} `);
    } catch (error) {
      console.error(`Message not published with routing key ${error} `);
    }
  }
}
