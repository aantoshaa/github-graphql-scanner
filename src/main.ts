import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export class Repo {
  name: string;

  size: number;

  owner: string;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
