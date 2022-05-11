import { Field, ObjectType } from 'type-graphql';

import { Employee } from './Employee';

@ObjectType({ description: 'The logged user model' })
export class SignInResponse {
  @Field(_type => Employee)
  user: typeof Employee;

  @Field()
  token: string;
}
