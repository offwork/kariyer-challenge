import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Job } from '../models/job.model';

export interface JobState extends EntityState<Job> {}

@StoreConfig({ name: 'jobs' })
export class JobsStore extends EntityStore<JobState, Job> {}

export const jobsStore = new JobsStore();
