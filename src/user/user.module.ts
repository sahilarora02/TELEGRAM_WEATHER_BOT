import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { User, userModel } from '../models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userModel }]),
  ],
  // controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UserModule {}
