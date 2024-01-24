import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { GoogleService } from './services/google.service';
import { Response, Request } from 'express';
import axios from 'axios';

@Controller('auth')
export class AuthController {
  constructor(private readonly googleService: GoogleService) {}

  // @Get('google')
  // async googleLogin(@Res() res: Response) {
  //   return res.redirect(googleAuthUrl);
  // }

  @Get('google/callback')
  async googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    const { code } = req.query;
    const accessToken = await this.exchangeCodeForAccessToken(code.toString());
    if (!accessToken) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
    }
    const userInfo = await this.googleService.getGoogleUserInfo(accessToken);
    res.cookie('userSession', userInfo, { httpOnly: true });
    res.redirect('http://localhost:3000/admin/panel');
  }

  private async exchangeCodeForAccessToken(code: string): Promise<string | null> {
    const tokenEndpoint = 'https://oauth2.googleapis.com/token';
  
    try {
      const response = await axios.post(tokenEndpoint, {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000/auth/google/callback',
        grant_type: 'authorization_code',
      });
  
      const { access_token } = response.data;
      return access_token;
    } catch (error) {
      console.error('Error exchanging code for access token:', error.message);
      return null;
    }
  }
}
