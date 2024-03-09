import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  http: HttpClient;
  apiBaseUrl: string = `http://localhost:8080/api`;

  constructor(http: HttpClient) {
    this.http = http;
  }
}
