import { Injectable } from '@nestjs/common';
import { GithubService } from 'src/modules/github/services';

@Injectable()
export class RepositoryService {
  constructor(private readonly githubService: GithubService) {}
}
