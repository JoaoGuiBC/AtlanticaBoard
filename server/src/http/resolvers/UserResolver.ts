import { Arg, Authorized, Query, Resolver } from 'type-graphql';

import { UserService } from '@services/userService';
import { SignInResponse } from '@models/User';

@Resolver()
export class UserResolver {
  private userService = new UserService();

  @Query(() => SignInResponse)
  async signIn(@Arg('email') email: string, @Arg('password') password: string) {
    const { user, token } = await this.userService.authenticate({
      email,
      password,
    });

    return { user, token };
  }

  @Query(() => String)
  @Authorized()
  revalidateJWT(@Arg('userId') userId: string) {
    const token = this.userService.revalidate(userId);

    return token;
  }
}
