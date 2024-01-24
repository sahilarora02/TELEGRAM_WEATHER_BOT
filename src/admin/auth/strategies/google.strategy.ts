// src/auth/strategies/google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, Profile } from 'passport-google-oauth20';
import { Strategy } from 'passport-google-oauth20';
import { GoogleService } from '../services/google.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly googleService: GoogleService) {
    super({
      clientID: '210664687384-m9euagt82utnuohclhvnev945aj70907.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback', 
    //   scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string): Promise<any> {
    return this.googleService.getGoogleUserInfo(accessToken);
  }
}
