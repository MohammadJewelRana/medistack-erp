import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.use(compression());

  app.use(cookieParser());

  app.enableCors({
    origin: [process.env.ADMIN_URL!, process.env.FRONTEND_URL!],
    credentials: true,
  });

  app.setGlobalPrefix(process.env.API_PREFIX!);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: process.env.API_VERSION!,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('PharmaFlow ERP API')
    .setDescription('Enterprise Pharmacy ERP REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new AllExceptionsFilter());

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 5000);

  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
}

bootstrap();
