import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './models/user.model';
import { UserService } from './user.service';

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  async createDefaultAdminUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return await this.userService.createDefaultAdminUser(createUserInput);
  }
}
