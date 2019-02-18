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
  private _url: string = "http://localhost/skkp/";

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<ISurat[]> {
    return this.http.get<ISurat[]>(this._url + 'api/pengajuan')
      .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error");

  }

  getSuratDetails(NIM) {
    return this.http.get(this._url + 'api/viewpengajuan?nim=' + NIM);
  }

}
