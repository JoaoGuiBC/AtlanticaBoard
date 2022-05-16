import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateProductInput {
  @Field()
  id: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  cost?: number;

  @Field({ nullable: true })
  description?: string;
}
