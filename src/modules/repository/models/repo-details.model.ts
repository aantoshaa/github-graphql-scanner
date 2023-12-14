import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Repo } from './repo.model';

@ObjectType()
export class RepoDetails extends Repo {
  @Field(() => Boolean)
  private: boolean;

  @Field(() => Int)
  filesCount: number;

  @Field()
  firstYamlFileContent: string;

  @Field(() => [String])
  activeWebhooks: string[];
}
