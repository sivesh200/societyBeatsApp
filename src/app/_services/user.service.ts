import { Injectable } from '@angular/core';
import { RestService } from '../_services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected rest: RestService) { }

  login(param) {
    return this.rest.post('admin/users/login', param);
  }

}
