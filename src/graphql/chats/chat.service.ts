import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatLogParams } from 'src/modles/chat.model';
import { ChatCollection, ChatDocument } from 'src/mongo/schemas/chat.schema';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(ChatCollection) private chatModel: Model<ChatDocument>,
  ) {}

  async addChatLog(body: ChatLogParams): Promise<void> {
    await this.chatModel.create({
      fromPhoneNo: body.fromNo,
      toPhoneNo: body.toNo,
      data: body.data,
    });
  }
}
