import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'The employee model' })
export class Employee {
  @Field(_type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  isAdmin: boolean;
}
