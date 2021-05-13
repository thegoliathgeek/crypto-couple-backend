import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User | Document;

@Schema()
export class User {
  @Prop()
  id?: string;

  @Prop()
  age: number;

  @Prop({ unique: true })
  phoneNo: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  otp?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserCollection = 'User';
