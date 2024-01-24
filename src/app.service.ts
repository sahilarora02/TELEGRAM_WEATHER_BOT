import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  // for my testing phasseeee
  getHello(): string {
    return 'Hello World!';
  }
}
