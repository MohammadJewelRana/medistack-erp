import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validationSchema } from './config/validation/validation.schema';
import { HealthModule } from './modules/health/health.module';
 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema,
    }),

    HealthModule,
  ],
})
export class AppModule {}