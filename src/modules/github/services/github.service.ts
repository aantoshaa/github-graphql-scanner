import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  async getRepoDetails(token: string, owner: string, repo: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`/repos/${owner}/${repo}/contents`, {
          headers: { Authorization: `Bearer: ${token}` },
        }),
      );
    } catch (error) {}
  }
}
