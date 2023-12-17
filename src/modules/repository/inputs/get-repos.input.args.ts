import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetReposArgs {
  @Field({ nullable: false })
  token: string;

  @Field()
  owner: string;

  @Field(() => [String])
  repos: string[];
}
