import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}


  @Post('start') 
  async start(@Body('chatId') chatId: number): Promise<string> {
    try {
      await this.telegramService.sendWelcomeMessage(chatId);
      return `Welcome message sent successfully!`;
    } catch (error) {
      throw new HttpException('Failed to send welcome message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // for testing purpose onlyyyyyyy
  @Post('webhook')
  async handleUpdate(@Body() update: any): Promise<any> {
    console.log("in webhook")
    try {
      const chatId = update.message.chat.id;
      console.log("erro-->",update.message)

      if (update.message.text === '/start') {
        await this.telegramService.sendWelcomeMessage(chatId);
      } else if (update.message.text === '/subscribe') {
        await this.telegramService.subscribe(chatId);
      }

      return { statusCode: HttpStatus.OK, message: 'Update received successfully' };
    } catch (error) {
      throw new HttpException('Failed to process update', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('subscribe')
  async subscribe(@Body('chatId') chatId: number): Promise<string> {
    console.log("chatid-->",chatId);
    try {
      await this.telegramService.subscribe(chatId);
      console.log("after await")
      return `Subscribed to daily weather updates!`;
    } catch (error) {
      throw new HttpException('Failed to subscribe user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('send-daily-update')
  async sendDailyUpdate(@Body('chatId') chatId: number): Promise<string> {
    try {
      await this.telegramService.sendDailyWeatherUpdate(chatId);
      return `Daily weather update sent successfully!`;
    } catch (error) {
      throw new HttpException('Failed to send daily weather update', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
