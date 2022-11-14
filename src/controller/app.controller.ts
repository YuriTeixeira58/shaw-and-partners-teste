import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/users')
  async getUsers(@Query() params) {
    return this.appService.getUsers(params);
  }

  @Get('/api/users/:username/details')
  async getUserByUsername(@Req() request: Request) {
    const username = request.params.username;
    return this.appService.getUsernameDetail(username);
  }

  @Get('/api/users/:username/repos')
  async getUserRepository(@Req() request: Request) {
    const username = request.params.username;
    return this.appService.getUserRepository(username);
  }
}
