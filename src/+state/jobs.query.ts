import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { JobState, jobsStore } from './jobs.store';

export class JobssQuery extends QueryEntity<JobState, Job> {
  jobs$: Observable<Job[]> = this.selectAll();
  active$: Observable<{}> = this.selectActive();
}

export const jobssQuery = new JobssQuery(jobsStore);
