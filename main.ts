import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { TelegramService } from 'src/telegram/telegram.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const telegramService = app.get(TelegramService);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  await app.listen(3000);
}

bootstrap();
