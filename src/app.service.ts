import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AppController } from './app.controller';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async getToken(code: string) {
    const url = `https://github.com/login/oauth/access_token?client_id=${AppController.client_id}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`;
    const res = await lastValueFrom(
      this.httpService.get(url, { headers: { Accept: 'application/json' } }),
    );
    console.log(res.headers); //application/x-www-form-urlencoded
    console.log(res.data);
  }
}
