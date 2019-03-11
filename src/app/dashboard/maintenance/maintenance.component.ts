import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SelectItem } from '../../_shared/common/api';
import { Globals } from '../../_utlity/globals';
import * as constants from "../../_utlity/constants";
import { AuthService } from '../../_services/auth.service';
import { GlobalService } from '../../_services/global.service';
import { MaintenanceService } from '../../_services/maintenance.service';
interface mSerList {
  name: string;
  code: string;
}

interface mSlotList {
  name: string;
  code: string;
}

interface mTowerList {
  name: string;
  code: string;
}

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {
  ftoken: any;
  services: any;
  uTickets: any[] = null;
  eTickets: any[] = null;
  cTickets: any[] = null;
  aTickets: any[] = null;
  oTickets: any[] = null;
  mDesc: any;
  mFlatNo: any;
  unsolvedTickets: any[] = [];
  esclatedTickets: any[] = [];
  assignedTickets: any[] = [];
  closeTickets: any[] = [];
  openTickets: any[] = [];

  // Rohit Changes
  values = '';
  onKey(event: any) {
    //this.values = event.target.value;
    let param = {
      tower_id: this.mTowerSelect.id,
      flat_address: event.target.value
    };
    this.srv.getFlatInfo(param).subscribe(resp => {
      this.values = resp.data.name;
      this.ftoken = resp.data.flat_token_no;
    })
    // var curVal = event.target.value;
    // if (curVal == 101) {
    //   this.values = "Sivesh Singh"
    // } else if (curVal == 102) {
    //   this.values = "Rohit Sharma"
    // } else if (curVal == '') {
    //   this.values = "Please Enter Flat Number"
    // } else {
    //   this.values = "Invalid Flat Number"
    // }
  }

  modalRef: BsModalRef;
  config = {
    class: "modal-lg"
  };

  ngOnInit() {
  }

  mService: any[];
  mServiceSelect: any;

  mSlots: any[];
  mSlotsSelect: any;

  mTower: any[];
  mTowerSelect: any;

  cars: SelectItem[];
  selectedCars1: string[] = [];
  timeSlots: any[] = [];

  reqDate: Date;
  constructor(private modalService: BsModalService, protected gs: GlobalService, protected srv: MaintenanceService) {
    // this.getTickets(1);  
    this.gs.towers.subscribe(data => this.mTower = data);
    this.gs.tSlot.subscribe(data => this.timeSlots = data);
    this.gs.oTicket.subscribe(data => this.oTickets = data);
    this.gs.aTicket.subscribe(data => this.aTickets = data);
    this.gs.cTicket.subscribe(data => this.cTickets = data);
    this.gs.eTicket.subscribe(data => this.eTickets = data);
    this.gs.uTicket.subscribe(data => this.uTickets = data);

    this.gs.getServices().subscribe(data => {
      this.mService = data.data
      this.gs.servicesSrc.next(data.data);
    });
    this.getTower();
    // this.gs.getTickets(1);
    // this.gs.getTickets(2);
    // this.gs.getTickets(3);
    // this.gs.getTickets(4);
    // this.gs.getTickets(5);

    // Rohit Changes
    this.cars = [
      { label: 'Electrician', value: 'Electrician' },
      { label: 'Plumber', value: 'Plumber' },
      { label: 'GT', value: 'GT' },
      { label: 'Carpainter', value: 'Carpainter' },
      { label: 'Janitor', value: 'Janitor' }
    ];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  tabChange(e){
    console.log('Event ->',e);
    this.gs.getTickets(e.index+1);
  }
  getTower() {
    this.gs.getTower().subscribe(data => {
      this.gs.towerSrc.next(data.data);
    });
  }

  getTimeslots(id) {
    this.gs.getTimeslot(id).subscribe(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.gs.tSlotSrc.next(res.data);
      }
    })
  }
  getTimeslot(d) {
    let d1 = new Date(d);
    for (let i = 0; i < this.timeSlots.length; i++) {
      let d2 = new Date(this.timeSlots[i].date);
      if (d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear()) {
        this.mSlots = this.timeSlots[i].timeSlot;
        console.log('Time Slot', this.timeSlots[i].timeSlot);
        break;
      }
    }
  }
  change(e) {
    console.log('Changed', e);
  }
  // Create new ticket
  createTicket() {
    try {

      let param = {
        category_id: this.mServiceSelect.id,
        booking_date: this.reqDate,
        timeslot_id: this.mSlotsSelect.id,
        title: this.mDesc,
        flat_token_no:this.ftoken
      }
      console.log('-----> ',param);
      
      this.gs.spin(true);
      this.gs.createTicket(param).subscribe(resp => {
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

  changeTab(e){
    console.log('TabChange',e);
  }
  //Get all tickets
  getTickets(id) {
    console.log('Maintanance ------------->', 'getTicket Trigged');
    if (id.indexOf('/') == -1) {
      id = id + '/0/0';
    }
    console.log('------>', id);
    try {
      this.gs.getTicket(id).subscribe(resp => {
        switch (id) {
          case 1: //Open
            //this.openTickets = data;
            // let tickets = [];
            // for (let i = 0; i < resp.data.length; i++) {
            //   let d = resp.data[i];
            //   tickets.push({
            //     assign_status: d.assign_status,
            //     assigned_user: d.assigned_user,
            //     assigned_user_details: d.assigned_user_details,
            //     attachments: d.attachments,
            //     booking_date: d.booking_date,
            //     brief: d.brief,
            //     category_id: this.getServById(d.category_id),
            //     createdAt: this.gs.LocalTimeString(d.createdAt),
            //     created_by: d.created_by,
            //     esclated_status: d.esclated_status,
            //     full_desc: d.full_desc,
            //     id: d.id,
            //     ratting: d.ratting,
            //     reached_status: d.reached_status,
            //     reject_reason: d.reject_reason,
            //     status: d.status,
            //     timeslot_id: d.timeslot_id,
            //     title: d.title,
            //     updatedAt: d.updatedAt,
            //     updated_by: d.updated_by,
            //     user_id: d.user_id
            //   })
            // }
            // this.gs.oTicketSrc.next(tickets);
            this.gs.oTicketSrc.next(resp.data);
            break;
          case 2: //Close
            // this.closeTickets = data;
            this.gs.cTicketSrc.next(resp.data);
            break;
          case 3: //Assigned
            // this.assignedTickets = data;
            this.gs.aTicketSrc.next(resp.data);
            break;
          case 4: //ESCLATED
            // this.esclatedTickets = data;
            this.gs.eTicketSrc.next(resp.data);
            break;
          case 5: //UNRESLOVED
            // this.unsolvedTickets = data;
            this.gs.uTicketSrc.next(resp.data);
            break;

        }
        console.log(id + '---->', resp.data);
      });
    } catch (e) {
      console.error(id + '---->', e);
    }
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


  getServices() {
    this.gs.spin(true);
    this.gs.getServices().subscribe(data => {
      this.gs.spin(false);
      this.gs.servicesSrc.next(data.data);
    })
  }
}