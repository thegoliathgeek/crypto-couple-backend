import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserCollection,
  UserDocument,
} from 'src/mongo/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserCollection) private userModel: Model<UserDocument>,
  ) {}

  async addUser(body: User) {
    const createdUser = await this.userModel.create(body);
    return createdUser;
  }

  async getUserById(id: string) {
    return this.userModel.findById(id);
  }
}
