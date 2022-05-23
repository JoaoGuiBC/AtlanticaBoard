import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateBudgetInfoInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  color?: string;

  @Field(() => Date, { nullable: true })
  deadline?: Date;

  @Field({ nullable: true })
  discount?: number;
}
