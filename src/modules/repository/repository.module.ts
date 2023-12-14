import { Module } from '@nestjs/common';
import { RepositoryResolver } from './resolvers';
import { RepositoryService } from './services';
import { GithubModule } from '../github';

@Module({
  imports: [GithubModule],
  providers: [RepositoryResolver, RepositoryService],
})
export class RepositoryModule {}
