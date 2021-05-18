import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatLogParams, SavedChatReturnType } from 'src/modles/chat.model';
import { ChatCollection, ChatDocument } from 'src/mongo/schemas/chat.schema';
import * as moment from 'moment';
@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(ChatCollection) private chatModel: Model<ChatDocument>,
  ) {}

  async addChatLog(body: ChatLogParams): Promise<ChatDocument> {
    return this.chatModel.create({
      from: body.from_id,
      to: body.to_id,
      data: body.data,
      sent: body.sent,
      timeStamp: moment().unix(),
    });
  }

  async updateSent(id: string) {
    await this.chatModel.updateOne({ _id: id }, { sent: true });
  }

  async findAllUnSentChats(toId: string): Promise<ChatDocument[]> {
    const chats = await this.chatModel
      .find({ to: toId, sent: false })
      .sort({ timestamp: 'ascending' });

    return chats;
  }
}
