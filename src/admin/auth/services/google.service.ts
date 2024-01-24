import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleService {
    private readonly clientId: string = process.env.CLIENT_ID;
    private readonly redirectUri: string = 'http://localhost:3000/auth/google/callback';
    private readonly authBaseUrl: string = 'https://accounts.google.com/o/oauth2/auth';
    // private readonly tokenEndpoint: string = 'https://oauth2.googleapis.com/token';
    getGoogleAuthUrl(): string {
        const scope = encodeURIComponent('profile email');
        const url = `${this.authBaseUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=${scope}`;
        return url;
      }
    
  async getGoogleUserInfo(accessToken: string): Promise<any> {
    const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }
}
