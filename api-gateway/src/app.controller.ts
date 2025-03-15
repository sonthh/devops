import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  heathyCheck() {
    return 'OK';
  }

  @Get('users')
  async findAllUsers() {
    const { users } = await firstValueFrom(this.appService.findAllUsers());

    return users;
  }
}
