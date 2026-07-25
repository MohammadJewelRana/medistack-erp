import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validationSchema } from './config/validation/validation.schema';
import { PrismaModule } from './core/prisma';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema,
    }),

    PrismaModule,

    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}