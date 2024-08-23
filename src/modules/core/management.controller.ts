import { Controller, Get } from '@nestjs/common';

@Controller()
export class ManagementController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
