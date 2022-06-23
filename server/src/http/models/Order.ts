import { Field, ID, ObjectType } from 'type-graphql';

import { Client } from './Client';
import { ProductBudget } from './ProductBudget';

@ObjectType({ description: 'The order model' })
export class Order {
  @Field(_type => ID)
  id: string;

  @Field()
  serialNumber: number;

  @Field()
  budgetSerialNumber: number;

  @Field()
  price: number;

  @Field({ nullable: true })
  color?: string;

  @Field(() => Date, { nullable: true })
  deadline?: Date;

  @Field()
  discount: number;

  @Field()
  signed: boolean;

  @Field(() => Date, { nullable: true })
  finished_at?: Date;

  @Field(() => Date)
  created_at: Date;

  @Field(() => [ProductBudget])
  products: ProductBudget[];

  clientId: string;
  @Field(() => Client)
  client: Client;
}
