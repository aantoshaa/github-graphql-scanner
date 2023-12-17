import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Repo } from './repo.model';
import { RepoWebhookModel } from './repo-webhook.model';

@ObjectType()
export class RepoDetails extends Repo {
  @Field(() => Boolean)
  private: boolean;

  @Field(() => Int)
  filesCount: number;

  @Field({ nullable: true })
  firstYamlFileContent?: string;

  @Field(() => [RepoWebhookModel])
  @Type(() => RepoWebhookModel)
  activeWebhooks: RepoWebhookModel[];
}
