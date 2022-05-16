import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  cost?: number;

  @Field({ nullable: true })
  description?: string;
}
