import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthModule } from 'src/auth/jwt-auth.module';
import { UserCollection, UserSchema } from 'src/mongo/schemas/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
@Module({
  imports: [
    JwtAuthModule,
    MongooseModule.forFeature([
      {
        schema: UserSchema,
        name: UserCollection,
      },
    ]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserGraphqlModule {}
