import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCollection, UserSchema } from 'src/mongo/schemas/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: UserSchema,
        name: UserCollection,
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.EXPIRES_IN },
    }),
  ],
  providers: [UserResolver, UserService, JwtStrategy],
  exports: [UserService, JwtModule],
})
export class UserGraphqlModule {}
