import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check() {
    return {
      status: 'ok',
      service: 'PharmaFlow ERP API',
      version: '1.0.0',
      timestamp: new Date(),
    };
  }
}