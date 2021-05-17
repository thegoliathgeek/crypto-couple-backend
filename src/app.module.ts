import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GateWayModule } from './gateway/gateway.module';
import { ChatsGraphqlModule } from './graphql/chats/chats.module';
import { UserGraphqlModule } from './graphql/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    UserGraphqlModule,
    ChatsGraphqlModule,
    GateWayModule,
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context(val) {
        return val;
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, { useCreateIndex: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
