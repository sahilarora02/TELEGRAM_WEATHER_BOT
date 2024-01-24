// import { Controller, Get, Post, Body, Param, NotFoundException  } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { User, userModel } from '../models/user.model'


// @Controller('users')
// export class UserController {
//     constructor(private readonly usersService: UsersService) {}
//   @Get()
//   async getAllUsers() {
//     console.log("in get all users")
//     const users = await this.usersService.findAll(); 
//     return users;
//   }

//   @Get('/blocked')
//   async getAllBlockedUsers() {
//     const blacklistedUsers = await this.usersService.findBlackListedUsers();
//     return blacklistedUsers;
//   }

//   @Post('/blocked/:userId')
//   async addUserToBlackList(@Param('userId') userId: string) {
//     const user = await this.usersService.findById(userId)

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     user.blocked = true;
//     await user.save();
//     return { message: 'User added to the blacklist' };
//   }

//   @Post('/unblock/:userId')
//   async unblockUser(@Param('userId') userId: string) {
//     const user = await this.usersService.findById(userId);

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     user.blocked = false;
//     await user.save();
//     return { message: 'User unblocked' };
//   }

 
// }

