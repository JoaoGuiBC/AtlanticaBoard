import { Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  @Query(() => String)
  async signIn() {
    return 'hello world';
  }
}
