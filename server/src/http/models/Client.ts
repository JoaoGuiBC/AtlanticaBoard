import { Field, ID, ObjectType } from 'type-graphql';

import { Address } from './Address';

@ObjectType({ description: 'The client model' })
export class Client {
  @Field(_type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  contact?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  document?: string;

  @Field({ nullable: true })
  stateRegistration?: string;

  @Field(() => [Address])
  address: Address[];
}
