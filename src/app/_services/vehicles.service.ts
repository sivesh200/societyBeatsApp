import { Injectable } from '@angular/core';
import { RestService } from '../_services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(protected rest: RestService) { }

  search(param){return this.rest.post('admin/vehicle/search-by-vehicle-number',param); }
  history(param) { return this.rest.post('admin/vehicle/vehicle-in-out',param); }
  update(param) { return this.rest.post('admin/vehicle/vehicle-in-out-status-update',param); }
}
