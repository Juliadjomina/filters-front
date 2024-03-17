import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpBaseService} from './http-base.service';
import {CriteriaTypeResponse} from '../models/criteria-type';

@Injectable({
  providedIn: 'root',
})
export class CriteriaTypeService extends HttpBaseService {
  getCriteriaTypes(): Observable<CriteriaTypeResponse[]> {
    return this.http.get<CriteriaTypeResponse[]>(`api/criteria-types`);
  }
}
