import { Field, ID, ObjectType } from 'type-graphql';

import { Budget } from './Budget';
import { Product } from './Product';

@ObjectType({ description: 'The product budget model' })
export class ProductBudget {
  @Field(_type => ID)
  id: string;

  @Field()
  base: number;

  @Field()
  height: number;

  @Field()
  price: number;

  productId: string;
  @Field(() => Product)
  product: Product;

  budgetId: string;
  @Field(() => Budget)
  budget: Product;
}
