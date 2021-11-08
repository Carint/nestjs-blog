import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { initSwagger } from './app.swagger';

import { AppModule } from './app/app.module';

import { SERVER_PORT } from './config/constants';
import { setDefaultUser } from './config/default-user';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger();
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;

  // Generación de la documentación del API
  initSwagger(app);

  // Autogeneración del usuario por defecto
  setDefaultUser(config);

  // Configuraciones de seguridad con la data recibida
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors();
  await app.listen(port);
  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
