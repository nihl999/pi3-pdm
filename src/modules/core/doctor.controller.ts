import { Controller, Get } from '@nestjs/common';

@Controller()
export class DoctorController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
