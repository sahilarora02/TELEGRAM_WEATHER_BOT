import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { TelegramService } from 'src/telegram/telegram.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const telegramService = app.get(TelegramService);
  await telegramService.setWebhook('https://037e-49-36-144-167.ngrok-free.app/telegram/webhook');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  await app.listen(3000);
}

bootstrap();
