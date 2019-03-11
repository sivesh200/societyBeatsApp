import { Injectable } from '@angular/core';
import { RestService } from '../_services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(protected rest: RestService) { 

  }


  getAll(){ return this.rest.get('admin/notices',{}); }
  add(param){ return this.rest.post('admin/notices',param); }
  update(param){ return this.rest.put('admin/notices',param); }
  delete(param){ return  this.rest.delete('admin/notices',param); }

}
