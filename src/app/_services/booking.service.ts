import { Injectable } from '@angular/core';
import { RestService} from './rest.service';
@Injectable({ 
  providedIn: 'root'
})
export class BookingService {

  constructor(protected rest: RestService) { 

  }

  getAllCategory(){ return this.rest.get('admin/master/get-all-booking-category',{}); }
  createCategory(param) { return this.rest.post('admin/master/create-booking-category',param); }
  updateCategory(param){ return this.rest.post('admin/master/update-booking-category',param); }
  deleteCategory(param){ return this.rest.delete('admin/master/delete-booking-category',param); }

}
