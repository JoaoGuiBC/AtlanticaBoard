import { Field, ID, ObjectType } from 'type-graphql';

import { ProductBudget } from './ProductBudget';

@ObjectType({ description: 'The product model' })
export class Product {
  @Field(_type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  cost?: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [ProductBudget])
  productBudget: ProductBudget[];
}
