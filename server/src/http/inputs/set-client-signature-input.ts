import { Field, InputType } from 'type-graphql';

@InputType()
export class SetClientSignatureInput {
  @Field()
  id: string;

  @Field()
  signature: string;
}
