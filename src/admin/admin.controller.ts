import {
  Controller,
  Get,
  Render,
  UseGuards,
  Param,
  Post,
  Body,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UsersService } from '../user/users.service';
import { User } from 'src/models/user.model';
import { GoogleService } from './auth/services/google.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly usersService: UsersService,
    private readonly googleService: GoogleService,
  ) {}

  @Get('login')
  @Render('adminLogin')
  async login(@Request() req): Promise<{ callbackUrl: string }> {
    const authUrl = this.googleService.getGoogleAuthUrl(); 
    return { callbackUrl: authUrl }; 
  }

  @Get('panel')
  @Render('admin-panel')
  async getAdminPanel(): Promise<{ botInfo: string; users: User[] }> {
    console.log('in admin-panel');
    const botInfo = this.adminService.getBotInfo();
    const users = await this.usersService.findAll();
    console.log('in get all users');
    console.log('users-->', users);

    return { botInfo, users };
  }


  @Post('/panel/updateApiKeys')
  updateApiKeys(
    @Body() keys: { newTelegramApiKey?: string; newWeatherApiKey?: string },
  ) {
    if (keys.newTelegramApiKey) {
      process.env.TELEGRAM_API_TOKEN = keys.newTelegramApiKey;
    }

    if (keys.newWeatherApiKey) {
      process.env.WEATHER_API_KEY = keys.newWeatherApiKey;
    }

    return { success: true, message: 'API keys updated successfully' };
  }
  @Get('/panel/getBlockedUsers')
  async getAllBlockedUsers() {
    const blacklistedUsers = await this.usersService.findBlackListedUsers();
    return blacklistedUsers;
  }

  @Post('/panel/blocked/:userId')
  async addUserToBlockedlist(@Param('userId') userId: string) {
    console.log('here in addUserToBlocklist ->', userId);
    const user = await this.usersService.findByUserId(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.blocked = true;
    await user.save();
    return { message: 'User added to the blacklist' };
  }

  @Post('/panel/delete/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<{ success: boolean; message?: string }> {
    try {
      await this.usersService.removeUserByUserId(userId);
      console.log("deleteee")

      return { success: true, message: 'User deleted successfully' };
    } catch (error) {
      return { success: false, message: 'Error deleting user' };
    }
  }

  @Post('/panel/unblock/:userId')
  async removeUserFromBlockedList(@Param('userId') userId: string) {
    const user = await this.usersService.findByUserId(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.blocked = false;
    await user.save();
    return { message: 'User unblocked' };
  }

  @Get()
  async getAllUsers() {
    console.log('in get all users');
    const users = await this.usersService.findAll();
    return users;
  }

  // @Post('change-api-key')
  // @Render('change-api-key-modal')
  // async changeApiKey(
  //   @Body('newApiKey') newApiKey: string,
  // ): Promise<{ botInfo: string }> {
  //   await this.adminService.changeApiKey(newApiKey);
  //   const botInfo = this.adminService.getBotInfo();
  //   return { botInfo };
  // }

  // @Get('blocked-users')
  // @Render('blocked-users-modal')
  // async getBlockedUsers(): Promise<{ blockedUsers: any[] }> {
  //   const blockedUsers = await this.adminService.getBlockedUsers();
  //   return { blockedUsers };
  // }

  // @Post('unblock-user')
  // @Render('blocked-users-modal')
  // async unblockUser(
  //   @Body('userId') userId: string,
  // ): Promise<{ blockedUsers: any[] }> {
  //   await this.adminService.unblockUser(userId);
  //   const blockedUsers = await this.adminService.getBlockedUsers();
  //   return { blockedUsers };
  // }
}
