import { Arg, Query, Resolver } from 'type-graphql';

import { UserService } from '@services/userService';
import { SignInResponse } from '@models/User';

@Resolver()
export class UserResolver {
  private employeesService = new UserService();

  @Query(() => SignInResponse)
  async signIn(@Arg('email') email: string, @Arg('password') password: string) {
    const { user, token } = await this.employeesService.authenticate({
      email,
      password,
    });

    return { user, token };
  }
}
