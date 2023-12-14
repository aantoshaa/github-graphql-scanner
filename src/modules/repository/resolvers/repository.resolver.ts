import { Resolver, Query } from '@nestjs/graphql';
import { Repo } from '../models';
import { RepositoryService } from '../services';

@Resolver()
export class RepositoryResolver {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Query(() => Repo)
  hello(): Repo {
    return { name: 'Anton Apalanyuk', owner: 'Anton Apalanyuk', size: 123 };
  }
}
