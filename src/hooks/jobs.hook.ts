import { Job } from '../models/job.model';
import { jobsService } from '../+state/jobs.service';
import { jobssQuery } from '../+state/jobs.query';
import { ID } from '@datorama/akita';
import { useEffect, useState } from 'react';
import { Observable, Subscription } from 'rxjs';

interface JobState { jobs: Job[]; active: Job | null; }

function onEmit<T>(source$:Observable<T>, nextFn:(value: T) => void): Subscription {
  return source$.subscribe(nextFn, console.error);
}

/**
 * View Model for Job view components
 */
export function useJobsFacade(): [JobState, Function] {
  const setActive = (id: ID) => jobsService.setActive(id);
  const [state, setState] = useState<JobState>({ jobs: [], active: null }); 

  /**
   * Manage subscriptions with auto-cleanup
   */
  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<Job[]>(jobssQuery.jobs$, jobs => setState(state => ({ ...state, jobs  })) ),
      onEmit<Job>(jobssQuery.active$, active => setState(state => ({ ...state, active })) )
    ];
    
    // jobsService.loadJobs();
    return () => { subscriptions.map(it => it.unsubscribe()) };
  },[]);

  return [state, setActive]
}