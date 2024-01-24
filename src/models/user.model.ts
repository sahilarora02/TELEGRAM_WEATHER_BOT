import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true, unique: true })
  userId: string; // here i am saving the telegram chat Id as userID of userrr

  @Prop({ type: Boolean, default: false })
  blocked: boolean;
}

export const userModel = SchemaFactory.createForClass(User);
