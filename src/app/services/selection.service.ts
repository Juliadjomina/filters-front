import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpBaseService} from './http-base.service';
import {Selection} from "../models/selection";

@Injectable({
  providedIn: 'root',
})
export class SelectionService extends HttpBaseService {
  getSelections(): Observable<Selection[]> {
    return this.http.get<Selection[]>(`api/selections`);
  }
}
