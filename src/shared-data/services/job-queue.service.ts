import { Injectable } from '@nestjs/common';

@Injectable()
export class JobQueueService {
  private readonly jobs: Array<() => Promise<unknown>> = [];

  private readonly MAX_JOBS_CONCURRENCY: number = 2;
  private ACTIVE_JOBS_COUNT: number = 0;

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const newJob = async () => {
        this.incrActiveJobsCount();

        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.decrActiveJobsCount();
          this.processNextJob();
        }
      };

      this.jobs.push(newJob);

      if (this.ACTIVE_JOBS_COUNT < this.MAX_JOBS_CONCURRENCY)
        this.processNextJob();
    });
  }

  private incrActiveJobsCount() {
    this.ACTIVE_JOBS_COUNT++;
  }

  private decrActiveJobsCount() {
    this.ACTIVE_JOBS_COUNT--;
  }

  private processNextJob() {
    const isExecutionAllowed =
      this.jobs.length > 0 &&
      this.ACTIVE_JOBS_COUNT < this.MAX_JOBS_CONCURRENCY;

    if (isExecutionAllowed) {
      const job = this.jobs.shift();
      job();
    }
  }
}
