import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ApiResponseInterceptor, ExceptionsInterceptor } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Swagger setup
  const config = new DocumentBuilder()
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
  .setTitle('Labourize API')
  .setDescription('API documentation for the Labourize application')
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('User')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none'
    }
  });

  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new ExceptionsInterceptor());
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
