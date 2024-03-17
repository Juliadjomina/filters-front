import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import {FilterResponse} from  '../_models/filter-response';
import {FilterRequest} from "../_models/filter-request";

@Injectable({
  providedIn: 'root'
})
export class FiltersService extends HttpBaseService {

  getAllFilters(): Observable<FilterResponse[]> {
    return this.http.get<FilterResponse[]>(`api/filters`);
  }

  saveFilter(data: FilterRequest): Observable<FilterRequest>{
    return this.http.post<FilterRequest>(`api/filters/save`, data);
  }
}
