import { Injectable } from '@nestjs/common';
import { filter, find, groupBy, includes, map, reduce, sum } from 'lodash';
import { extname } from 'path';
import { GithubService } from '../../github/services';
import { Repo, RepoDetails } from '../models';
import { runPartially } from '../../../shared-data';
import { DEFAULT_QUEUE_CHUNK_SIZE, YML_FILES_EXTENSIONS } from '../const';
import { IGithubRepositoryTree } from '../../github/interfaces';
import { RepositoryItemType } from '../../github/enums';
import { RequestedFieldsMap } from '../interfaces';

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

  async getRepoDetails(
    token: string,
    owner: string,
    repoName: string,
    path: string,
    fields?: RequestedFieldsMap<RepoDetails>,
  ): Promise<RepoDetails> {
    const [repo, activeRepoWebhooks, yamlFileData, filesCount] =
      await Promise.all([
        this.githubService.getRepo(token, owner, repoName),
        fields.activeWebhooks && this.getActiveWebhooks(token, owner, repoName),
        fields.firstYamlFileContent &&
          this.findFirstYamlFileRecursively(token, owner, repoName, path),
        fields.filesCount &&
          this.getFilesCountRecursively(token, owner, repoName, path),
      ]);

    const repoDetails: RepoDetails = {
      name: repo.name,
      owner: repo.owner.login,
      size: repo.size,
      private: repo.private,
      activeWebhooks: activeRepoWebhooks,
      filesCount,
    };

    if (yamlFileData) {
      const firstYamlFileContent = await this.getFileContent(
        token,
        owner,
        repoName,
        yamlFileData.sha,
      );
      repoDetails.firstYamlFileContent = firstYamlFileContent;
    }

    return repoDetails;
  }

  private async getActiveWebhooks(
    token: string,
    owner: string,
    repoName: string,
  ) {
    const repoWebhooks = await this.githubService.getRepoWebhooks(
      token,
      owner,
      repoName,
    );
    const activeRepoWebhooks = filter(
      repoWebhooks,
      (webhook) => webhook.active,
    );
    return activeRepoWebhooks;
  }

  private async getFileContent(
    token: string,
    owner: string,
    repoName: string,
    path: string,
  ) {
    const fileData = await this.githubService.getFileContent(
      token,
      owner,
      repoName,
      path,
    );

    const decodedContent = atob(fileData.content);
    return decodedContent;
  }

  private async getFilesCountRecursively(
    token: string,
    owner: string,
    repoName: string,
    path: string,
  ): Promise<number> {
    const repoData = await this.githubService.getRepoContent(
      token,
      owner,
      repoName,
      path,
    );

    const groupedByTypeContent = groupBy(repoData.tree, 'type');
    const filesCount =
      groupedByTypeContent[RepositoryItemType.BLOB]?.length || 0;

    const folders = groupedByTypeContent[RepositoryItemType.TREE];
    if (!folders || folders.length === 0) return filesCount;

    const result = await Promise.all(
      folders.map((folder) =>
        this.getFilesCountRecursively(token, owner, repoName, folder.sha),
      ),
    );

    const totalFilesCount = reduce(
      result,
      (acc, count) => acc + count,
      filesCount,
    );
    return totalFilesCount;
  }

  private async findFirstYamlFileRecursively(
    token: string,
    owner: string,
    repoName: string,
    path: string,
  ): Promise<IGithubRepositoryTree | null> {
    const content = await this.githubService.getRepoContent(
      token,
      owner,
      repoName,
      path,
    );

    const ymlFile = find(content.tree, (item) =>
      includes(YML_FILES_EXTENSIONS, extname(item.path)),
    );

    if (ymlFile) return ymlFile;

    const folders = filter(
      content.tree,
      (item) => item.type === RepositoryItemType.TREE,
    );

    for (const folder of folders) {
      const result = await this.findFirstYamlFileRecursively(
        token,
        owner,
        repoName,
        folder.sha,
      );

      if (result) return result;
    }

    return null;
  }
}
