import { Injectable } from '@angular/core';
import { RestService } from 'src/app/_services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  constructor(protected rest: RestService) {

  } 
  getAllCategory() { return this.rest.get('admin/master/get-all-maintenance-category', {}); }
  createCategory(param) { return this.rest.post('admin/master/create-maintenance-category', param); }
  updateCategory(param) { return this.rest.post('admin/master/update-maintenance-category', param); }
  deleteCategory(param) { return this.rest.post('admin/master/delete-maintenance-category', param); }
  getTicket(catId) {return this.rest.get('admin/maintanence/get-all-ticket/' + catId , {}); }
  getFlatInfo(param){return this.rest.post('admin/maintanence/flat-info',param);}
  getStaff() { return this.rest.get('admin/staff',{});}
  getStaffEngagment(param){return this.rest.get('admin/maintanence/get-staff-engagement-by-category-id/'+param,{});}
}
