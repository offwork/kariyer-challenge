import { ajax } from 'rxjs/ajax';
import { JobsStore, jobsStore } from './jobs.store';
import { ID } from '@datorama/akita';
import { Job } from '../models/job.model';

export class JobsService {
  constructor(private usersStore: JobsStore) {}

  loadJobs(url: string) {
    ajax
      .getJSON<Job[]>(url)
      .subscribe(entities => {
        this.usersStore.set(entities);
      });
  }

  setActive(id: ID) {
    this.usersStore.setActive(id);
  }

  updateActive(job: Job) {
    this.usersStore.updateActive(job);
  }
}

export const jobsService = new JobsService(jobsStore);
