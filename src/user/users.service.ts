import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from  '../models/user.model'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async createUser(userId: string): Promise<User> {
    console.log("in createUser userID->",userId);
    const newUser = new this.userModel({ userId, blocked: false });
    console.log("newuser -->",newUser);
    return newUser.save();
  }
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findBlackListedUsers() : Promise<User[]>{
    return this.userModel.find({blocked: true})
  }

  async findByUserId(userId: string): Promise<User | null> {
    return this.userModel.findOne({ userId }).exec();
  }

  async removeUserByUserId(userId: string): Promise<void> {
   const u =  await this.userModel.findOneAndDelete({ userId }).exec();
console.log("in remove user");
    return ;
  }

}
