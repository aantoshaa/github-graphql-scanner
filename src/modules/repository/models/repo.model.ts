import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Repo {
  @Field()
  name: string;

  @Field(() => Int)
  size: number;

  @Field()
  owner: string;
}
