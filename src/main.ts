import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv'
dotenv.config()

import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { swaggerConfiguration } from './swagger/config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000
  const prefix = process.env.API_PREFIX ?? 'api'

  app.enableCors({
    origin: [process.env.CORS_ORIGIN ?? '*'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  })

  swaggerConfiguration(app);
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(port, () => {
    Logger.log(`Server running on port ${port}`, 'main')
  });
}
bootstrap();
