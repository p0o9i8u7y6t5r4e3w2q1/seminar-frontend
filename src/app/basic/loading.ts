import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export class Loading {
  numOfWaiting: number;
  loadingSubject: BehaviorSubject<any>;

  constructor() {
    this.numOfWaiting = 0;
    this.loadingSubject = new BehaviorSubject(this.numOfWaiting);
  }

  wait() {
    this.numOfWaiting--;
    this.loadingSubject.next(this.numOfWaiting);
  }

  complete() {
    this.numOfWaiting++;
    this.loadingSubject.next(this.numOfWaiting);
  }

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable().pipe(
      map(val => val === 0),
      distinctUntilChanged(),
    );
  }
}
