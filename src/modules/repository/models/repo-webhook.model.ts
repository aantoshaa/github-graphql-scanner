import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class RepoWebhookModel {
  @Expose()
  @Field(() => Int)
  id: number;

  @Expose()
  @Field(() => String)
  name: string;

  @Expose()
  @Field(() => String)
  type: string;

  @Expose()
  @Field(() => Boolean)
  active: boolean;
}
