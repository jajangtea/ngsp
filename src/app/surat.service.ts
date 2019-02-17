import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { catchError, retry } from 'rxjs/operators';
import { ISurat } from './model/ISurat';

@Injectable({
  providedIn: 'root'
})
export class SuratService {
  private _url: string = "/assets/data/employees.json";

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<ISurat[]> {
    return this.http.get<ISurat[]>(this._url)
      .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error");

  }

}
