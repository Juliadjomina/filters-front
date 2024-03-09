import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import {FilterResponse} from  '../_models/filter-response';
import {CriteriaResponse} from "../_models/criteria-response";
import {CriteriaType} from "../_models/criteria-type";

@Injectable({
  providedIn: 'root'
})
export class CriteriaTypeService extends HttpBaseService {

  getCriteriaTypes(): Observable<CriteriaType[]> {
    return this.http.get<CriteriaType[]>(`${this.apiBaseUrl}/criteria-types`);
  }
}
