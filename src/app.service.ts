import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AppController } from './app.controller';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async getToken(code: string) {
    const url = `https://github.com/login/oauth/access_token?client_id=${AppController.client_id}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`;
    const token_res = await lastValueFrom(
      this.httpService.get(url, { headers: { Accept: 'application/json' } }),
    );
    // console.log(res.headers); //application/x-www-form-urlencoded
    // console.log(res.data);
    if (!token_res.data.access_token) throw new ForbiddenException();
    const token = token_res.data.access_token;
    const url2 = 'https://api.github.com/user';
    const data_res = await lastValueFrom(
      this.httpService.get(url2, { headers: { Authorization: `token ${token}` } }),
    );
    return {
      login: data_res.data.login,
      avatar_url: data_res.data.avatar_url
    };
  }
}
