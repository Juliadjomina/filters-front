import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import {FilterResponse} from  '../_models/filter-response';

@Injectable({
  providedIn: 'root'
})
export class FiltersService extends HttpBaseService {

  getAllFilters(): Observable<FilterResponse[]> {
    return this.http.get<FilterResponse[]>(`${this.apiBaseUrl}/filters`);
  }
}
