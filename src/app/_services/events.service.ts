import { Injectable } from '@angular/core';
import { RestService} from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(protected rest: RestService) { 

  }

  getEvents(){ return this.rest.get('admin/events',{}); }
  addEvents(param){ return this.rest.post('admin/events',param); }
  updateEvents(param){ return this.rest.put('admin/events',param); }
  delEvents(param){ return  this.rest.delete('admin/events',param); }
  
  getEventGallery(param){ return this.rest.get('admin/events/gallery/'+param);}
  addEventGallery(param){ return this.rest.post('admin/events/gallery',param);}
  UpdateEventGallery(param){ return this.rest.put('admin/events/gallery',param);}
  delEventGallery(param){ return this.rest.delete('admin/events/gallery',param);}
  
}
