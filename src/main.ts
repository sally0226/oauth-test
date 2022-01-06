import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public')); // 정적 리소스 저장에 사용
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // 템플릿 포함, hbs 템플릿 엔진 사용하여 html출력 렌더링
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
