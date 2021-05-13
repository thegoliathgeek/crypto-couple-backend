import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateUserArgs } from './user.args';
import { UserReturnType } from './user.return.type';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => String)
  async sayHello() {
    return 'Hello Bitch';
  }

  @Mutation(() => UserReturnType)
  async addUser(@Args({ name: 'args' }) args: CreateUserArgs) {
    return this.userService.addUser(args);
  }

  @Query(() => UserReturnType)
  async getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }
}
