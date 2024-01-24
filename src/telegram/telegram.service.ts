import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import { UsersService } from '../user/users.service';
@Injectable()
export class TelegramService {
  private readonly bot: Telegraf;
  private readonly weatherApiKey: string;

  constructor(private readonly configService: ConfigService, private readonly usersService: UsersService,) {
    this.bot = new Telegraf(configService.get<string>('TELEGRAM_API_TOKEN'));
    
    console.log("this.bot->",this.bot);
    this.bot.command('start', async (ctx) => this.handleStartCommand(ctx));
    this.weatherApiKey = configService.get<string>('WEATHER_API_KEY');
    console.log("this.weatherApiKey->",this.weatherApiKey);
  }
  async handleStartCommand(ctx: any): Promise<void> {
    console.log("in handleStartCOmmand");
    const chatId = ctx.message.chat.id;
    await this.sendWelcomeMessage(chatId);
  }
  
 // for just testing
  async setWebhook(webhookUrl: string): Promise<void> {
    try {
      console.log("hereeeeee");
      const s = await this.bot.telegram.getWebhookInfo();
      if(s){
        console.log(" s already exist")
      }else{

        await this.bot.telegram.deleteWebhook();
  
        await this.bot.telegram.setWebhook(webhookUrl);
        console.log(`Webhook set successfully: ${webhookUrl}`);
      }

    } catch (error) {
      console.error(`Error setting webhook: ${error.message}`);
      throw error;
    }
  }



  async sendMessage(chatId: number, message: string): Promise<void> {
    try {
      await this.bot.telegram.sendMessage(chatId, message);
    } catch (error) {
      console.error(`Error sending message to chat ${chatId}: ${error.message}`);
      throw error;
    }
  }

  async subscribe(chatId: number): Promise<void> {
    try {
      const chatIdString = chatId.toString();
      console.log("chatIdString->",chatIdString);
   const user = await this.usersService.createUser(chatIdString);
   console.log("user in subscribe-->",user);
      const message = 'Subscribed for daily weather updates!';
      console.log("chat id in subscribe",chatId)
      await this.sendMessage(chatId, message);
    } catch (error) {
      console.error(`Error during subscription for chat ${chatId}: ${error.message}`);
      throw error;
    }
  }

  async sendDailyWeatherUpdate(chatId: number): Promise<void> {
    try {
      const apiKey = this.weatherApiKey;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=India&aqi=no`;

    const response = await fetch(apiUrl);
    const weatherData = await response.json();

    const temperatureCelsius = weatherData.current.temp_c;

    console.log(temperatureCelsius);
    const weatherUpdate = `Today's temperature in New Delhi: ${temperatureCelsius}°C`;
      await this.sendMessage(chatId, weatherUpdate);
    } catch (error) {
      console.error(`Error sending daily weather update to chat ${chatId}: ${error.message}`);
      throw error;
    }
  }

  async sendWelcomeMessage(chatId: number): Promise<void> {
    try {
      const welcomeMessage = 'Welcome to the WeatherBot! You can subscribe for daily weather updates by typing /subscribe.';

      await this.sendMessage(chatId, welcomeMessage);
    } catch (error) {
      console.error(`Error sending welcome message to chat ${chatId}: ${error.message}`);
      throw error;
    }
  }

}
