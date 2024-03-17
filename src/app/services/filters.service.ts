import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import { FilterResponse } from '../models/filter-response';
import { FilterRequest } from '../models/filter-request';

@Injectable({
  providedIn: 'root',
})
export class FiltersService extends HttpBaseService {
  getAllFilters(): Observable<FilterResponse[]> {
    return this.http.get<FilterResponse[]>(`api/filters`);
  }

  saveFilter(data: FilterRequest): Observable<FilterRequest> {
    return this.http.post<FilterRequest>(`api/filters/save`, data);
  }
}
