import { Resolver, Query, Args } from '@nestjs/graphql';
import { Repo, RepoDetails } from '../models';
import { RepositoryService } from '../services';
import { GetRepoDetailsInputDto, GetReposInputDto } from '../inputs';

@Resolver()
export class RepositoryResolver {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Query(() => [Repo])
  async repos(
    @Args('getReposInputDto') data: GetReposInputDto,
  ): Promise<Repo[]> {
    const response = await this.repositoryService.getRepos(
      data.token,
      data.owner,
      data.repos,
    );
    return response;
  }

  @Query(() => RepoDetails)
  async repoDetails(
    @Args('getRepoDetailsInputDto') data: GetRepoDetailsInputDto,
  ): Promise<RepoDetails> {
    const response = await this.repositoryService.getRepoDetails(
      data.token,
      data.owner,
      data.repo,
      data.branch,
    );
    return response;
  }
}
