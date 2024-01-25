// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramModule } from './telegram/telegram.module';
import { AuthModule } from './admin/auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './database.config'
import { UserModule } from './user/user.module';
@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.url),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TelegramModule,
    // AdminModule,
    // UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: any): void {
    consumer
      .apply(
        require('cookie-parser')(),
        require('express-session')({ secret: 'your-secret-key', resave: true, saveUninitialized: true }),
      )
      .forRoutes('*');
  }
}
