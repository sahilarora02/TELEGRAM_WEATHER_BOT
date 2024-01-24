import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TelegrafModule.forRootAsync({
      imports: [UserModule, ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_API_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class TelegramModule {}
