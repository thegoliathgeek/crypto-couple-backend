import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SessionCollections,
  SessionDocument,
} from 'src/mongo/schemas/session.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(SessionCollections)
    private readonly sessionModel: Model<SessionDocument>,
  ) {}

  async addSession(data: any, id: string) {
    return this.sessionModel.create({
      data,
      id,
    });
  }
}
