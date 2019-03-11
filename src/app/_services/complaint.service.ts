import { Injectable } from '@angular/core';
import { RestService} from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(protected rest: RestService) { 

  }
  getAllCategory(){ return this.rest.get('admin/master/get-all-complaint-category',{}); }
  createCategory(param) { return this.rest.post('admin/master/create-complaint-category',param); }
  updateCategory(param){ return this.rest.post('admin/master/update-complaint-category',param); }
  deleteCategory(param){ return this.rest.post('admin/master/delete-complaint-category',param); }

}
