import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateEmployeeInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;
}
