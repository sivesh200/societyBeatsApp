import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { EventsService } from '../../_services/events.service';
import { GlobalService } from '../../_services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  uImage: any[]=[{id:0,img:''}];
  gl: any[]=[];
  image: any;
  desc: any;
  title: any;
  currentEvent: any;
  modalRef: BsModalRef;
  Mconfig = { class: 'modal-lg' };
  MconfigLG = { class: 'modal-ex-lg' };
  events: any[] = [];
  link:string ;


  uploadUrl: string;
  uploadedFiles: any[] = [];

  constructor(private modalService: BsModalService, protected srv: EventsService, protected global: GlobalService) {
    this.link = this.global.link ;
    this.getEvenets();
  }

  

  getEvenets() {
    try {
      this.srv.getEvents().subscribe(resp => {
        console.log('Events --->', resp);
        this.events = resp.data;
      }, err => {

      })

    } catch (e) {

    }
  }
  submit() {
    // if (this.currentEvent.title == undefined || this.currentEvent.title == '' || this.currentEvent.title == null) {
    //   this.global.error('Please enter event title....');
    //   return;
    // } else if (this.currentEvent.full_desc == undefined || this.currentEvent.full_desc == '' || this.currentEvent.full_desc == null) {
    //   this.global.error('Please enter event description....');
    //   return;
    // }else if (this.currentEvent.image == undefined || this.image.full_desc == '' || this.image.full_desc == null) {
    //   this.global.error('Please enter event description....');
    //   return;
    // }
    if (this.title == undefined || this.title == '' || this.title == null) {
      this.global.error('Please enter event title....');
      return;
    } else if (this.desc == undefined || this.desc == '' || this.desc == null) {
      this.global.error('Please enter event description....');
      return;
    }else if (this.image == undefined || this.image == '' || this.image == null) {
      this.global.error('Please select a cover image....');
      return;
    }
    try {
      let param = {
        title: this.title,
        image: this.image,
        brief_desc: "",
        full_desc: this.desc
      };
      this.srv.addEvents(param).subscribe(resp => {
        if (resp.success == true) {
          this.global.success(resp.message, "New Event");
          this.getEvenets();
        }
        this.modalRef.hide()
      })
    } catch (e) {
      console.log('Error on adding event----->',e)
    }
  }

  update() {
    console.log('Event',this.currentEvent);
    if (this.currentEvent.title == undefined || this.currentEvent.title == '' || this.currentEvent.title == null) {
      this.global.error('Please enter event title....');
      return;
    } else if (this.currentEvent.brief_desc == undefined || this.currentEvent.brief_desc == '' || this.currentEvent.brief_desc == null) {
      this.global.error('Please enter event description....');
      return;
    }
    try {
      let param = {
        id: this.currentEvent.id,
        title: this.currentEvent.title,
        image: this.image,
        brief_desc: this.currentEvent.brief_desc,
        full_desc: this.currentEvent.full_desc
      };
      this.srv.updateEvents(param).subscribe(resp => {
        if (resp.success == true) {
          this.global.success(resp.message, "Edit Event");
          this.getEvenets();
        } else {
          this.global.error(resp.message, "Edit Event");
        }
        this.modalRef.hide()
      }, err => {
        this.global.error('Unable to update event', "Edit Event");
      })
    } catch (e) {

    }
  }

  upload(){
    let param = this.uImage;
    param.splice(this.uImage.length-1);
    try{
      this.srv.addEventGallery(param).subscribe(resp=>{
        if(resp.success == true){
          this.global.success(resp.message);
          this.uImage = [{
            id:-1,
            image:null,
            title:null,
            event_id:null,
            brief_desc:'',
            full_desc:'',
            location:''
          }];
        }
        console.log(resp);
      })
    }catch(e){

    }
  }

  delete(id) {
    // this.global
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.srv.delEvents({id:id}).subscribe(resp=>{
          if (resp.success == true) {
            Swal(
              'Deleted!',
              'Event has been deleted.',
              'success'
            );
            this.getEvenets();
          }else{
            Swal(
              'Failed',
              resp.error,
              'error'
            )
          }
        },err=>{
          Swal(
            'Failed',
            'Unable to delete this event :)',
            'error'
          )
        })
        
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal(
          'Cancelled',
          'Your event is safe :)',
          'error'
        )
      }
    });
  }

  delGImg(id) {
    // this.global
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.srv.delEventGallery({id:id}).subscribe(resp=>{
          if (resp.success == true) {
            Swal(
              'Deleted!',
              'Event has been deleted.',
              'success'
            );
            this.getEvenets();
          }else{
            Swal(
              'Failed',
              resp.error,
              'error'
            )
          }
        },err=>{
          Swal(
            'Failed',
            'Unable to delete this event :)',
            'error'
          )
        })
        
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal(
          'Cancelled',
          'Your event is safe :)',
          'error'
        )
      }
    });
  }
  editModal(createEvent: TemplateRef<any>, event) {
    this.currentEvent = event;
    this.getGallery(event.id);
    console.log('---->', this.currentEvent);
    this.modalRef = this.modalService.show(createEvent, this.MconfigLG);
  }
  openModal(createEvent: TemplateRef<any>) {
    this.modalRef = this.modalService.show(createEvent, this.Mconfig);
  }

  getGallery(eid){
    try{
      this.srv.getEventGallery(eid).subscribe(resp=>{
        this.gl = resp.data;
      })
    }catch(e){

    }
  }


  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      // console.log('Image',this.image);
    }
    myReader.readAsDataURL(file);
  }

  changeListener1($event,id) : void {
    this.readThis1($event.target,id);
  }
  
  check(e){
    console.log('Selected File',e); 
  }
  readThis1(inputValue: any, id:number): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.uImage[id] = {
        id:id,
        image:myReader.result,
        title:this.currentEvent.title,
        event_id:this.currentEvent.id,
        brief_desc:'',
        full_desc:'',
        location:''
      }
      // this.uImage[id].id=id;
      // this.uImage[id].img=myReader.result;
      
      this.uImage.push({
        id:-1,
        image:null,
        title:null,
        event_id:null,
        brief_desc:'',
        full_desc:'',
        location:''
      })
      console.log('Image',this.uImage);
    }
    myReader.readAsDataURL(file);
  }

  remove(id){
    this.uImage.splice(id,1);
  }
  
  ngOnInit() { }

  
}
