import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserCollection,
  UserDocument,
} from 'src/mongo/schemas/user.schema';
import { hash, compare } from 'bcrypt';
import { UserInputError } from 'apollo-server-errors';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserCollection) private userModel: Model<UserDocument>,
  ) {}

  async addUser(body: User) {
    const createdUser = await this.userModel.create({
      ...body,
      password: await hash(body.password, 10),
    });
    return createdUser;
  }

  async getUserById(id: string) {
    return this.userModel.findById(id);
  }

  async findUserByUsername(body: { username: string; password: string }) {
    const user: any = await this.userModel.findOne({ username: body.username });
    if (!user) {
      throw new UserInputError('User not found');
    }
    if (await compare(body.password, user.password)) {
      return user;
    }
    throw new UserInputError('User not found');
  }
}
