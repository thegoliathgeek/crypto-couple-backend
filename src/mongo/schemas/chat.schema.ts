import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaM } from 'mongoose';

@Schema()
export class Chat {
  @Prop({ auto: true })
  _id: SchemaM.Types.ObjectId;
  @Prop()
  data: string;

  @Prop()
  to: string;

  @Prop()
  from: string;

  @Prop()
  timeStamp: number;

  @Prop({ default: false })
  sent: boolean;
}

export type ChatDocument = Chat | Document;

export const ChatSchema = SchemaFactory.createForClass(Chat);

export const ChatCollection = 'Chats';
