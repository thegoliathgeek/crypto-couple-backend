import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaT } from 'mongoose';

@Schema()
export class Session {
  @Prop()
  data?: SchemaT.Types.Mixed;

  @Prop()
  id?: string;
}

export type SessionDocument = Session | Document;
export const SessionSchema = SchemaFactory.createForClass(Session);
export const SessionCollections = 'Sessions';
