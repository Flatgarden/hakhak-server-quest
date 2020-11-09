import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(data?: string): string {
    if (data) return data;
    return 'Hello World!';
  }
}
