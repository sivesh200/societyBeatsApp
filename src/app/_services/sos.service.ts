import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class SosService {

  constructor(protected rest: RestService) {

  }
  getAllCategory() { return this.rest.get('admin/master/get-all-sos-category', {}); }
  createCategory(param) { return this.rest.post('admin/master/create-sos-category', param); }
  updateCategory(param) { return this.rest.post('admin/master/update-sos-category', param); }
  deleteCategory(param) { return this.rest.post('admin/master/delete-sos-category', param); }
}
