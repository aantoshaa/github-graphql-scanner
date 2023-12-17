import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetRepoDetailsArgs {
  @Field()
  token: string;

  @Field()
  owner: string;

  @Field()
  repo: string;

  @Field()
  branch: string;
}
