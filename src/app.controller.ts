import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
   // for my testing phase
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
