import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpBaseService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }
}
