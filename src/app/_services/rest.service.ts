import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import * as constants from '../_utlity/constants';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  url: string = constants.config.baseAPIURL;
  httpOptions: { headers: HttpHeaders; };
  constructor(private http: Http, private auth: AuthService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': auth.getToken()
      })
    };
  }

  get(endPoin: string, params?: any, optn?: any) {
    if (!optn) {
    }
    let headers = new Headers();
    let crntToken = this.auth.getToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', crntToken);
    const options = new RequestOptions({ headers: headers });
    let p = [];
    let newParam;
    if (params) {
      for (let d in params) {
        let str = d + '=' + params[d];
        p.push(str);
      }
      newParam = p.join('&');
    }
    try {
      if (params) {
        return this.http.get(this.url + endPoin + '?' + newParam, options)
          .pipe(map(res => res.json()));
      } else {
        return this.http.get(this.url + endPoin, options)
          .pipe(map(res => res.json()));
      }
    } catch (e) {
      console.log(e);
    }
  }

  post(endPoin: string, params?: any, ootn?: any) {
    let headers = new Headers();
    let crntToken = this.auth.getToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', crntToken);
    const options = new RequestOptions({ headers: headers });
    try {
      return this.http.post(this.url + endPoin, params, options)
        .pipe(map(res => res.json()));
    } catch (e) {
      console.log(e);
    }
  }

  put(endPoin: string, params?: any, ootn?: any) {
    let headers = new Headers();
    let crntToken = this.auth.getToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', crntToken);
    const options = new RequestOptions({ headers: headers });
    try {
      return this.http.put(this.url + endPoin, params, options)
        .pipe(map(res => res.json()));
    } catch (e) {
      console.log(e);
    }
  }

  delete(endPoin: string, params?: any, ootn?: any) {
    let headers = new Headers();
    let crntToken = this.auth.getToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', crntToken);
    const options = new RequestOptions({ headers: headers, body: params});
    try {
      return this.http.delete(this.url + endPoin, options)
        .pipe(map(res => res.json()));
    } catch (e) {
      console.log(e);
    }
  }
}

