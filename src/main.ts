  import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('MICROSERVICE_PORT');
  const host = configService.get('MICROSERVICE_HOST')
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: port ,
      host: host  ,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
