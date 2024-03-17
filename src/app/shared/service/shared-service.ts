import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
  }

  setFilterSaved(data: boolean): void {
    this.dataSubject.next(data);
  }

  getFilterSaved(): Observable<boolean> {
    return this.dataSubject.asObservable();
  }
}
