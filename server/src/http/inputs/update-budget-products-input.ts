import { Field, InputType } from 'type-graphql';

@InputType()
export class Product {
  @Field()
  id: string;
}

@InputType()
export class ProductBudgetList {
  @Field()
  id: string;

  @Field()
  base: number;

  @Field()
  height: number;

  @Field()
  price: number;

  @Field()
  productId: string;
}

@InputType()
export class UpdateBudgetProductsInput {
  @Field()
  id: string;

  @Field(() => [ProductBudgetList])
  budgetProducts: ProductBudgetList[];
}
