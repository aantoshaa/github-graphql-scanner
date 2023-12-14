import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GithubService } from './services';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('GITHUB_API_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [GithubService],
  exports: [GithubService],
})
export class GithubModule {}
