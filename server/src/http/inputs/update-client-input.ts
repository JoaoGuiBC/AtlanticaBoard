import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateClientInput {
  @Field()
  id: string;

  @Field()
  idAddress: string;

  @Field()
  street: string;

  @Field({ nullable: true })
  contact?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  stateRegistration?: string;

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
