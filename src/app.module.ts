import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RepositoryModule } from './modules/repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => {
        const NODE_ENV = configService.get<string>('NODE_ENV');
        return {
          ...(NODE_ENV === 'development' && {
            playground: true,
            introspection: true,
          }),
          formatError: (error: GraphQLError) => {
            const graphQLFormattedError: GraphQLFormattedError = {
              message: error.message,
              path: error.path,
            };
            return graphQLFormattedError;
          },
          autoSchemaFile: join(process.cwd(), './gql/schema.gql'),
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    RepositoryModule,
  ],
})
export class AppModule {}
