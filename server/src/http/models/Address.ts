import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'The address model' })
export class Address {
  @Field(_type => ID)
  id: string;

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

  clientId?: string;
}
