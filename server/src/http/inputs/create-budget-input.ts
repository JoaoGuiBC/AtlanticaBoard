import { Field, InputType } from 'type-graphql';

@InputType()
class ProductInput {
  @Field()
  productId: string;

  @Field()
  base: number;

  @Field()
  height: number;

  @Field()
  price: number;
}

@InputType()
export class CreateBudgetInput {
  @Field({ nullable: true })
  color?: string;

  @Field(() => Date, { nullable: true })
  deadline?: Date;

  @Field({ nullable: true })
  discount?: number;

  @Field()
  clientId: string;

  @Field(() => [ProductInput])
  products: ProductInput[];
}
