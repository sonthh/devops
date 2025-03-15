import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UserService', 'findAll')
  async findAll() {
    const users = await this.appService.findAll();

    return { users };
  }
}
