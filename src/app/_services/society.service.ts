import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class SocietyService {
constructor(protected rest: RestService) {

  }
  getAllCategory() { return this.rest.get('admin/master/get-all-society-category', {}); }
  createCategory(param) { return this.rest.post('admin/master/create-society-category', param); }
  updateCategory(param) { return this.rest.post('admin/master/update-society-category', param); }
  deleteCategory(param) { return this.rest.post('admin/master/delete-society-category', param); }
}
