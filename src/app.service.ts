import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  sendHello(): string {
    return 'Hi from send hello';
  }
}
