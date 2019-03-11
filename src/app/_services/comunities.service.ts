import { Injectable } from '@angular/core';
import { RestService } from '../_services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class ComunitiesService {

  constructor(protected rest: RestService) { }

  get(){ return this.rest.get('admin/communities',{}); }
  addCommunity(param){ return this.rest.post('admin/communities',param); }
  update(param){ return this.rest.put('admin/communities',param); }
  delete(param){ return  this.rest.delete('admin/communities',param); }

  getAllMembers(param) { return this.rest.get('admin/communities/members/'+param,{});}
  delMember(param) { return this.rest.delete('admin/communities/members/',param);}
  // getAllMembers(param) { return this.rest.get('admin/communities/members/'+param,{});}
}
