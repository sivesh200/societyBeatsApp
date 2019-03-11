import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from '../_services/rest.service';


@Injectable()
export class CountryService {

    constructor(private http: HttpClient,protected rest: RestService) { }
    
    
    getCountries() {
    return this.http.get<any>('assets/data/countries.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
    }
}