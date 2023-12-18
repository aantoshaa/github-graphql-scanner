import { Module } from '@nestjs/common';
import { JobQueueService } from '../../shared-data';
import { RepositoryResolver } from './resolvers';
import { RepositoryService } from './services';
import { GithubModule } from '../github';

@Module({
  imports: [GithubModule],
  providers: [RepositoryResolver, RepositoryService, JobQueueService],
})
export class RepositoryModule {}
