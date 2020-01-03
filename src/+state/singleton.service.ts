import { ajax } from 'rxjs/ajax';
import { tap } from 'rxjs/operators';
import { Tag } from '../models/tag.model';
import { Job } from '../models/job.model';

class SingletonService {
  private _tags: Tag[] = [];
  private _jobs: Job[] = [];

  get tags(): Tag[] { return [...this._tags]}
  get jobs(): Job[] { return [...this._jobs]; }

  loadTags() {
    return ajax
      .getJSON<Tag[]>('http://localhost:3001/tags')
      .pipe(tap(tags => this._tags = tags))
  }

  loadJob(url: string) {
    return ajax
      .getJSON<Job[]>(url)
      .pipe(tap(jobs => this._jobs = jobs))
  }
}

export const singletonService = new SingletonService();