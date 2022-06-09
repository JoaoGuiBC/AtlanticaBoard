import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateClientInput {
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

  @Field()
  street: string;

  @Field({ nullable: true })
  number?: number;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  district?: string;

  @Field({ nullable: true })
  cep?: string;
}
