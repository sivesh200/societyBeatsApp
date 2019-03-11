import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { SelectItem } from '../../_shared/common/api';
import { Globals } from '../../_utlity/globals';
import * as constants from "../../_utlity/constants";
import { AuthService } from '../../_services/auth.service';
import { GlobalService } from '../../_services/global.service';
import { StaffService } from '../../_services/staff.service';
import { getTView } from '@angular/core/src/render3/instructions';
import { MaintenanceService } from '../../_services/maintenance.service';
export interface Car {
  item1;
  item2;
  item3;
  item4;
  item5;
  item6;
  item7;
  item8;
  item9;
  item10;
  // Rohit Changes
  visibleSidebar1;
}


@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class OpenComponent implements OnInit {
  oTickets: any[] = [];
  services: any[] = [];
  timeSlots: any[] = [];
  mTower: any[] = [];
  tickets: any[] = [];
  selectedTicket: any;
  visibleSidebar1: any;
  params: any;
  link: string;

  mService: any[];
  mServiceSelect: any;

  selectedStaff:any;

  modalRef: BsModalRef;
  config = {
    class: "modal-lg"
  };

  // Rohit Changes
  filter: any[];
  filCategory: any[];


  staff:any[]=[];
  // config = {
  //   animated: true,
  //   keyboard: true,
  //   backdrop: true,
  //   ignoreBackdropClick: false,
  //   class: "modal-lg"
  // };
  sFilter:any;
  sFilCategory:any;

  //staff:any[]=[];
  constructor(private modalService: BsModalService, protected gs: GlobalService, protected st: StaffService, protected srv:MaintenanceService) {
    //this.getTickets();
    this.link = this.gs.link + 'maintenance/';
    this.gs.oTicket.subscribe(data =>{ 
      this.oTickets = data;
      console.log('New OpenTickets',data);
    });
    // this.gs.towers.subscribe(data => this.mTower = data);
    // this.gs.tSlot.subscribe(data => this.timeSlots = data);
    this.gs.Staff.subscribe(data => {
      this.staff = data;
      console.log('---->',this.staff);
    });
    // this.getOpenTicket();

    // Rohit Changes
    this.filter = [
      { label: 'Today', value: '0' },
      { label: 'Tomorrow', value: '1' },
      { label: 'Next 7 Days', value: '2' },
      { label: 'Next 15 Days', value: '3' }
    ];
    // this.filCategory = [
    //   { label: 'All', value: '0' },
    //   { label: 'Electrician', value: '1' },
    //   { label: 'Plumber', value: '2' },
    //   { label: 'Carpenter', value: '3' },
    //   { label: 'GT', value: '4' },
    //   { label: 'Janitor', value: '5' }
    // ];
    this.getCategory();
    this.getTickets();
    
  }

  getStaff(d){
    try{
      let tid=d.category_id;
      this.srv.getStaffEngagment(tid).subscribe(resp=>{
        this.staff = resp.data;
        console.log('------->',resp);
      })
    }catch(e){

    }
  }

  getTimeslots(d){
    console.log('---->',d);
  }
  getCategory(){
    this.filCategory =[];
    this.srv.getAllCategory().subscribe(d=>{
      console.log('---->',d);
      for(let i=0;i<d.data.length;i++){
        let row = d.data[i];
        this.filCategory.push({
          label:row.title,
          value:row.id
        });
      }
      // this.filCategory =d.data;
    });
  }

  getServById(id) {
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].id == id) {
        return this.services[i].title;
      }
    }
  }
  getSlotById(id, date) {

    for (let i = 0; i < this.timeSlots.length; i++) {
      if (this.timeSlots[i].id == id) {
        return this.services[i];
      }
    }
  }

  getTickets(){
    // this.srv.getTicket('1/0/0');
    let op = ['Open', 'Close', 'Assigned', 'Esclated', 'Unresolved'];
    this.gs.spin(true);
    let param = '1/0/0';
    try {
      this.srv.getTicket(param).subscribe(resp => {
        this.gs.spin(false);
        // this.gs.oTicketSrc.next(resp.data);
        if(resp.data=={}){
          this.gs.oTicketSrc.next([]);
        }else{
          this.gs.oTicketSrc.next(resp.data);
        }
      });
    } catch (e) {
      this.gs.spin(false);
      console.log('Error', e);
    }
  }
  getDate(d){
    return this.gs.DateString(d,0) + ' ' + this.gs.DateString(d,1);
  }

  filterData(t,v){
    let op = ['Open', 'Close', 'Assigned', 'Esclated', 'Unresolved'];
    this.gs.spin(true);
    let param = '1/'+(t==undefined?0:t)+'/'+(v==undefined?0:v);
    try {
      this.srv.getTicket(param).subscribe(resp => {
        this.gs.spin(false);
        // this.gs.oTicketSrc.next(resp.data);
        if(resp.data=={}){
          this.gs.oTicketSrc.next([]);
        }else{
          this.gs.oTicketSrc.next(resp.data);
        }
      });
    } catch (e) {
      this.gs.spin(false);
      console.log('Error', e);
    }
  }
  
  getStff(){
    try{
      this.srv.getStaff().subscribe(resp=>{
        this.gs.StaffSrc.next(resp.data);
        console.log('----> Staff',this.staff);
        
      })
    }catch(e){

    }
  }
  openModal(template: TemplateRef<any>, selectedTicket: any) {
    this.getStaff(selectedTicket);
    this.selectedTicket = selectedTicket;
    console.log(this.selectedTicket);
    this.modalRef = this.modalService.show(template, this.config);
  }

  chStaff(d){
    this.selectedStaff = this.staff[d.index];
    console.log('------->',this.selectedStaff);
    
  }

  assignTicket(id=0) {
    try {

      let param = {
        id: this.selectedTicket.id,
        status: 3,
        assign_status: 1,
        assigned_user: this.selectedStaff.id
      }

      console.log(param);
      this.gs.spin(true);
      this.gs.updateTicket(param).subscribe(resp => {
        this.gs.spin(false);
        if (resp.success == true) {
          this.gs.getTickets(1);
          this.gs.success(resp.message);

        } else {
          this.gs.warn(resp.error);
        }
        // alert(data.message);
        // console.log("Crerate Ticket",data);
      });
    } catch (e) {
      this.gs.error(e);
    }
  }

  ngOnInit() {
  }

  test() {
    // console.log("test");

  }
  cars = [
    { item1: "Electrician", item2: "E2345", item3: "12:00 - 01:00 PM", item4: "16 Jun'18 12:10 PM	", item5: "1204", item6: "G", item7: "12", item8: "Rohit Sharma", item9: "Switch borard burnt", item10: "" },
    { item1: "Electrician", item2: "E2345", item3: "12:00 - 01:00 PM", item4: "16 Jun'18 12:10 PM	", item5: "1204", item6: "G", item7: "12", item8: "Rohit Sharma", item9: "Socket Shorting out", item10: "" },
    { item1: "Electrician", item2: "E2345", item3: "12:00 - 01:00 PM", item4: "16 Jun'18 12:10 PM	", item5: "1204", item6: "G", item7: "12", item8: "Rohit Sharma", item9: "Socket Shorting out", item10: "" },
    { item1: "Electrician", item2: "E2345", item3: "12:00 - 01:00 PM", item4: "16 Jun'18 12:10 PM	", item5: "1204", item6: "G", item7: "12", item8: "Rohit Sharma", item9: "Socket Shorting out", item10: "" },
    { item1: "Electrician", item2: "E2345", item3: "12:00 - 01:00 PM", item4: "16 Jun'18 12:10 PM	", item5: "1204", item6: "G", item7: "12", item8: "Rohit Sharma", item9: "Socket Shorting out", item10: "" },
  ];


}
