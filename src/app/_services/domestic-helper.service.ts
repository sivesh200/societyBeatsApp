import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class DomesticHelperService {

  constructor(protected rest: RestService) {

  }
  getAllCategory() { return this.rest.get('admin/master/get-all-domestic-helper-category', {}); }
  createCategory(param) { return this.rest.post('admin/master/create-domestic-helper-category', param); }
  updateCategory(param) { return this.rest.post('admin/master/update-domestic-helper-category', param); }
  deleteCategory(param) { return this.rest.post('admin/master/delete-domestic-helper-category', param); }

  getHelpers(param){ return this.rest.post('admin/domestic-helper/in-out',param); }
  serachHelpers(param){ return this.rest.post('admin/domestic-helper/search-by-name-number',param); }
  updateHelpers(param) { return this.rest.post('admin/domestic-helper/in-out-status-update',param); }
  
}
