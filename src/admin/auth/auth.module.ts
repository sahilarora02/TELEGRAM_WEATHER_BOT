import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';
import { GoogleService } from './services/google.service';
import { AdminModule } from '../admin.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' })
  ],
  providers: [GoogleStrategy,GoogleService],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
