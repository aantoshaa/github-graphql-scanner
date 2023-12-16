import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  IGithubRepository,
  IRecursiveRepositoryData,
  IRepositoryWebhookData,
} from '../interfaces';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  async getRepo(
    token: string,
    owner: string,
    repo: string,
  ): Promise<IGithubRepository> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<IGithubRepository>(`/repos/${owner}/${repo}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return data;
    } catch (error) {
      throw new BadRequestException({
        message: `[GithubService getRepo] ${
          error?.response?.data?.message || error?.message || error?.stack
        }`,
        data: { owner, repo },
      });
    }
  }

  async getRepoContent(
    token: string,
    owner: string,
    repo: string,
    path: string,
  ): Promise<IRecursiveRepositoryData> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<IRecursiveRepositoryData>(
          `/repos/${owner}/${repo}/git/trees/${path}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
      return data;
    } catch (error) {
      throw new BadRequestException({
        message: `[GithubService getRepoContent] ${
          error?.response?.data?.message || error?.message || error?.stack
        }`,
        data: { owner, repo },
      });
    }
  }

  async getRepoWebhooks(
    token: string,
    owner: string,
    repo: string,
  ): Promise<IRepositoryWebhookData[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<IRepositoryWebhookData[]>(
          `/repos/${owner}/${repo}/hooks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );

      return data;
    } catch (error) {
      throw new BadRequestException({
        message: `[GithubService getRepoWebhooks] ${
          error?.response?.data?.message || error?.message || error?.stack
        }`,
        data: { owner, repo },
      });
    }
  }
}
