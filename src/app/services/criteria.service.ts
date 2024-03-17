import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import { Criteria } from '../models/criteria';

@Injectable({
  providedIn: 'root',
})
export class CriteriaService extends HttpBaseService {
  getFilterCriteria(filterId: number): Observable<Criteria[]> {
    return this.http.get<Criteria[]>(`api/criteria/${filterId}`);
  }
}
