import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class GetRepoDetailsInputDto {
  @Field()
  @IsString()
  token: string;

  @Field()
  @IsString()
  owner: string;

  @Field()
  @IsString()
  repo: string;

  @Field()
  @IsString()
  branch: string;
}
