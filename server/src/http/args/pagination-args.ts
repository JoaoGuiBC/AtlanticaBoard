import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PaginationArgs {
  @Field(_type => Int, { nullable: true })
  skip?: number;

  @Field(_type => Int, { nullable: true })
  take?: number;
}
