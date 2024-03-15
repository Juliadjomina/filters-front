import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpBaseService} from './http-base.service';
import {Criteria} from "../_models/criteria";

@Injectable({
  providedIn: 'root'
})
export class CriteriasService extends HttpBaseService {

  getFilterCriterias(filterId: number): Observable<Criteria[]> {
    return this.http.get<Criteria[]>(`${this.apiBaseUrl}/criteria/${filterId}`);
  }
}
