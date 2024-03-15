import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpBaseService} from './http-base.service';
import {ComparisonOperator} from "../_models/comparison-operator";

@Injectable({
  providedIn: 'root'
})
export class ComparisonOperatorService extends HttpBaseService {

  getComparisonOperator(): Observable<ComparisonOperator[]> {
    return this.http.get<ComparisonOperator[]>(`${this.apiBaseUrl}/comparison-operators`);
  }
}
