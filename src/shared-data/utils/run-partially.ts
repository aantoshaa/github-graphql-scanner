import { chunk as chunkify } from 'lodash';

export const runPartially = async <T>(
  jobs: Promise<T>[],
  chunkSize: number,
): Promise<T[]> => {
  const chunks = chunkify(jobs, chunkSize);
  const result: Awaited<T>[] = [];

  for await (const chunk of chunks) {
    const resolvedChunk = await Promise.all(chunk);
    result.push(...resolvedChunk);
  }
  return result;
};
