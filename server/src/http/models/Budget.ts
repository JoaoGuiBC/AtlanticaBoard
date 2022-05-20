import { Field, ID, ObjectType } from 'type-graphql';

import { Client } from './Client';
import { ProductBudget } from './ProductBudget';

@ObjectType({ description: 'The budget model' })
export class Budget {
  @Field(_type => ID)
  id: string;

  @Field()
  serialNumber: number;

  @Field()
  price: number;

  @Field({ nullable: true })
  color?: string;

  @Field(() => Date, { nullable: true })
  deadline?: Date;

  @Field({ nullable: true })
  discount?: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => [ProductBudget])
  products: ProductBudget[];

  clientId: string;
  @Field(() => Client)
  client: Client;
}
