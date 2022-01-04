import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  static client_id = '99d998a9ad5069e2a14e';
  static scope = 'repo,user';
  static url = `https://github.com/login/oauth/authorize?client_id=${AppController.client_id}&scope=${AppController.scope}`;

  @Get('login')
  @Redirect(AppController.url, 302)
  getHello() {}

  @Get('callback')
  loginCallback(@Query('code') code) {
    console.log(code);
    return this.appService.getToken(code);
  }
}
