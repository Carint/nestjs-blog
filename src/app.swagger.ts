import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Documenting API endpoints')
    .addBearerAuth()
    .setDescription(
      'Reference documentation for API endpoints consists of five general sections: resource descriptions, endpoints and methods, parameters, sample requests, and sample responses and schemas. To document the reference endpoints of an API, provide detailed information for each of these sections.',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);
};
