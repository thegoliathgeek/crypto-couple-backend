import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaM } from 'mongoose';

@Schema()
export class Chat {
  @Prop()
  _id: string;

  @Prop()
  data: string;

  @Prop()
  toPhoneNo: string;

  @Prop()
  fromPhoneNo: string;

  @Prop()
  timeStamp: SchemaM.Types.Date;
}

export type ChatDocument = Chat | Document;

export const ChatSchema = SchemaFactory.createForClass(Chat);

export const ChatCollection = 'Chats';
