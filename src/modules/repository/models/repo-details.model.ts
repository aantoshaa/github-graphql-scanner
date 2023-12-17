import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Repo } from './repo.model';
import { RepoWebhookModel } from './repo-webhook.model';
import { Expose, Type } from 'class-transformer';

@ObjectType()
export class RepoDetails extends Repo {
  @Expose()
  @Field(() => Boolean)
  private: boolean;

  @Field(() => Int)
  @Expose()
  filesCount: number;

  @Field({ nullable: true })
  @Expose()
  firstYamlFileContent?: string;

  @Expose()
  @Field(() => [RepoWebhookModel])
  @Type(() => RepoWebhookModel)
  activeWebhooks: RepoWebhookModel[];
}
