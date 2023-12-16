import { Injectable } from '@nestjs/common';
import { filter, map } from 'lodash';
import { GithubService } from '../../github/services';
import { Repo, RepoDetails } from '../models';
import { runPartially } from '../../../shared-data';
import { DEFAULT_QUEUE_CHUNK_SIZE } from '../const';

@Injectable()
export class RepositoryService {
  constructor(private readonly githubService: GithubService) {}

  async getRepos(
    token: string,
    owner: string,
    reposNames: string[],
  ): Promise<Repo[]> {
    const jobs = map(reposNames, (repo) =>
      this.githubService.getRepo(token, owner, repo),
    );
    const repos = await runPartially(jobs, DEFAULT_QUEUE_CHUNK_SIZE);

    const processedRepos: Repo[] = map(repos, ({ name, owner, size }) => ({
      name,
      owner: owner.login,
      size,
    }));
    return processedRepos;
  }

  async onApplicationBootstrap() {
    await this.getRepoDetails(
      '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',
      'aantoshaa',
      'repoA',
      '',
    );
  }

  async getRepoDetails(
    token: string,
    owner: string,
    repoName: string,
    shaOrBranchOrTag: string,
  ): Promise<RepoDetails> {
    const [repo, repoWebhooks] = await Promise.all([
      this.githubService.getRepo(token, owner, repoName),
      this.githubService.getRepoWebhooks(token, owner, repoName),
    ]);

    const activeRepoWebhooks = filter(
      repoWebhooks,
      (webhook) => webhook.active,
    );

    const repoDetails: RepoDetails = {
      name: repo.name,
      owner: repo.owner.login,
      size: repo.size,
      private: repo.private,
      activeWebhooks: activeRepoWebhooks,
    };

    return repoDetails;
    // IRecursiveRepositoryDataRepo name
    // Repo size
    // Repo owner
    // Private\public repo
    // Number of files in the repo
    // Content of 1 yml file (any one that appear in the repo)
    // Active webhooks
  }
}
