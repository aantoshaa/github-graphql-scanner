import { Resolver, Query, Args, Info } from '@nestjs/graphql';
import { Repo, RepoDetails } from '../models';
import { RepositoryService } from '../services';
import { GetRepoDetailsArgs, GetReposArgs } from '../inputs';
import { GQLRequestedFields } from '../decorators';
import { RequestedFieldsMap } from '../interfaces';

@Resolver()
export class RepositoryResolver {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Query(() => [Repo])
  async repos(@Args() data: GetReposArgs): Promise<Repo[]> {
    const response = await this.repositoryService.getRepos(
      data.token,
      data.owner,
      data.repos,
    );
    return response;
  }

  @Query(() => RepoDetails)
  async repoDetails(
    @Args() data: GetRepoDetailsArgs,
    @GQLRequestedFields() fields: RequestedFieldsMap<RepoDetails>,
  ): Promise<RepoDetails> {
    const response = await this.repositoryService.getRepoDetails(
      data.token,
      data.owner,
      data.repo,
      data.branch,
      fields,
    );

    return response;
  }
}
