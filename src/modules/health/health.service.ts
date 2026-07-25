import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check() {
    return {
      message: 'API is running successfully',
      data: {
        status: 'ok',
        service: 'PharmaFlow ERP',
        version: '1.0.0',
        timestamp: new Date(),
      },
    };
  }
}
