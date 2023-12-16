import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class GetReposInputDto {
  @Field({ nullable: false })
  @IsString()
  token: string;

  @Field()
  @IsString()
  owner: string;

  @Field(() => [String])
  @IsString({ each: true })
  repos: string[];
}
