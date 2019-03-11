import { Injectable } from '@angular/core';
import { RestService } from 'src/app/_services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(protected rest: RestService) {

  }
  getAllStaff() { return this.rest.get('admin/staff', {}); }
  getAllUser() { return this.rest.get('admin/users', {}); }
  createStaff(param) { return this.rest.post('admin/master/create-sos-category', param); }
  updateStaff(param) { return this.rest.post('admin/master/update-sos-category', param); }
  deleteStaff(param) { return this.rest.post('admin/master/delete-sos-category', param); }
  newStaff(param) { return this.rest.post('admin/staff/',param);}
  
}
