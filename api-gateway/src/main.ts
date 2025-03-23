import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'http://tuanhung.xyz',
      'https://tuanhung.xyz',
      'http://34.8.136.29',
      'https://34.8.136.29',
    ],
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
