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
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserCollection) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
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

  async validateUser(body: { username: string; password: string }) {
    const user: any = await this.userModel.findOne({ username: body.username });
    if (!user) {
      throw new UserInputError('User not found');
    }
    if (await compare(body.password, user.password)) {
      return user;
    }
    throw new UserInputError('User not found');
  }

  async login(body: { username: string; password: string }) {
    const user: any = await this.userModel.findOne({ username: body.username });
    if (!user) {
      throw new UserInputError('User not found');
    }
    if (await compare(body.password, user.password)) {
      return {
        access_token: this.jwtService.sign({
          username: user.username,
          id: user._id + '',
          name: user.name,
        }),
        user_id: user._id + '',
      };
    }
    throw new UserInputError('User not found');
  }
}
