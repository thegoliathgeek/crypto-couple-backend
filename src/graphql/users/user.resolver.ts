import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GraphqlJwtGuard } from 'src/auth/guards/graphql-jwt.guard';
import { CreateUserArgs, LoginArgs } from './user.args';
import { TokenReturnType, UserReturnType } from './user.return.type';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Query(() => String)
  async sayHello(@Context() ctx) {
    console.log(ctx.req.user);
    return 'Hello Bitch';
  }

  @Mutation(() => UserReturnType)
  async addUser(@Args({ name: 'args' }) args: CreateUserArgs) {
    return this.userService.addUser(args);
  }

  @Mutation(() => TokenReturnType)
  async login(@Args('args') args: LoginArgs) {
    return this.userService.login({
      ...args,
    });
  }

  @Query(() => UserReturnType)
  async getUserById(@Context() ctx, @Args('id') id: string) {
    console.log(ctx.req.user);
    return this.userService.getUserById(id);
  }
}
