import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/api_gateway/config/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'POS-service',
        brokers: ['localhost:9092'], 
      },
      consumer: {
        groupId: 'user-account',
      },
    },
  });

  await app.listen();
}
bootstrap();