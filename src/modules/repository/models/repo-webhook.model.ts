import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RepoWebhookModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  type: string;

  @Field(() => Boolean)
  active: boolean;
}
