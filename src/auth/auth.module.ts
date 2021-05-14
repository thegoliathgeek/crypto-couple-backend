import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserGraphqlModule } from 'src/graphql/users/user.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UserGraphqlModule, PassportModule],
  providers: [LocalStrategy],
})
export class AuthModule {}
