import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import {FilterResponse} from  '../_models/filter-response';
import {CriteriaResponse} from "../_models/criteria-response";

@Injectable({
  providedIn: 'root'
})
export class CriteriasService extends HttpBaseService {

  getCriterias(id: number): Observable<CriteriaResponse[]> {
    return this.http.get<CriteriaResponse[]>(`${this.apiBaseUrl}/criterias/${id}`);
  }
}
