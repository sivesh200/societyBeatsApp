import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../_services/global.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { TemplateRef } from '@angular/core';
export interface Car {
  vin;
  year;
  brand;
  color;
}

@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class AssignedComponent implements OnInit {

  ngOnInit() {
  }

  cars = [
    { vin: "aa", year: "2015", brand: "1234", color: "red" },
    { vin: "aa", year: "2015", brand: "1234", color: "red" },
    { vin: "aa", year: "2015", brand: "1234", color: "red" },
    { vin: "aa", year: "2015", brand: "1234", color: "red" },
    { vin: "aa", year: "2015", brand: "1234", color: "red" },
    { vin: "aa", year: "2015", brand: "1234", color: "red" },
    { vin: "aa", year: "2015", brand: "1234", color: "red" },
    { vin: "aa", year: "2015", brand: "1234", color: "red" },
    { vin: "aa", year: "2015", brand: "1234", color: "red" },
    { vin: "aa", year: "2015", brand: "1234", color: "red" },
    { vin: "aa", year: "2015", brand: "1234", color: "red" },

  ];

  oTickets: any;
  services: any[];
  timeSlots: any[];
  mTower: any[];
  tickets: any[];
  modalRef: BsModalRef;
  config = {
    class: "modal-lg"
  };
  link: string;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  constructor(private modalService: BsModalService, protected gs: GlobalService) {
    this.link = this.gs.link + 'maintenance/';
    this.getTickets();
    this.gs.aTicket.subscribe(data=> this.oTickets = data);
    this.gs.towers.subscribe(data => this.mTower = data);
    this.gs.tSlot.subscribe(data => this.timeSlots = data);
    this.gs.services.subscribe(data => this.services = data);
    // this.getOpenTicket();
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
  getTickets() {
    let op = ['Open', 'Close', 'Assigned', 'Esclated', 'Unresolved'];
    this.gs.spin(true);
    try {
      this.gs.getTicket('3/0/0').subscribe(resp => {
        this.gs.spin(false);
        // this.tickets = [];
        // for (let i = 0; i < resp.data.length; i++) {
        //   let d = resp.data[i];
        //   this.tickets.push({
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
        //   });
        // }
        this.gs.aTicketSrc.next(resp.data);
      });
    } catch (e) {
      console.log('Error', e);
    }
  }
  getDate(d){
    return this.gs.DateString(d,0) + ' ' + this.gs.DateString(d,1);
  }   
  getTicket() {
    this.tickets = [];
    for (let i = 0; i < this.oTickets.length; i++) {
      let d = this.oTickets[i];
      this.tickets.push({
        assign_status: d.assign_status,
        assigned_user: d.assigned_user,
        assigned_user_details: d.assigned_user_details,
        attachments: d.attachments,
        booking_date: d.booking_date,
        brief: d.brief,
        category_id: this.getServById(d.category_id),
        createdAt: d.createdAt,
        created_by: d.created_by,
        esclated_status: d.esclated_status,
        full_desc: d.full_desc,
        id: d.id,
        ratting: d.ratting,
        reached_status: d.reached_status,
        reject_reason: d.reject_reason,
        status: d.status,
        timeslot_id: d.timeslot_id,
        title: d.title,
        updatedAt: d.updatedAt,
        updated_by: d.updated_by,
        user_id: d.user_id
      });
    }
    console.log('Open tickets', this.tickets);
  }
}
