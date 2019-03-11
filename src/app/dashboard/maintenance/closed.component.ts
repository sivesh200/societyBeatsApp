import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../_services/global.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { TemplateRef } from '@angular/core';
import { MaintenanceService } from 'src/app/_services/maintenance.service';
export interface Car {
  vin;
  year;
  brand;
  color;
  // Rohit Changes
  visibleSidebar1;
}

@Component({
  selector: 'app-close',
  templateUrl: './closed.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class ClosedComponent implements OnInit {
  oTickets: any;
  services: any[];
  timeSlots: any[];
  mTower: any[];
  tickets: any[];
  modalRef: BsModalRef;
  visibleSidebar1: any;
  sFilter: any;
  sFilCategory: any;
  config = {
    class: "modal-lg"
  };

  // Rohit Changes
  filter: any[];
  filCategory: any[];

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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  constructor(private modalService: BsModalService, protected gs: GlobalService, protected srv: MaintenanceService) {
    this.getTickets();
    this.gs.cTicket.subscribe(data => this.oTickets = data);
    this.gs.towers.subscribe(data => this.mTower = data);
    this.gs.tSlot.subscribe(data => this.timeSlots = data);
    this.gs.services.subscribe(data => this.services = data);
    // this.getOpenTicket();


    // Rohit Changes
    this.filter = [
      { label: 'Today', value: '0' },
      { label: 'Tomorrow', value: '1' },
      { label: 'Next 7 Days', value: '2' },
      { label: 'Next 15 Days', value: '3' }
    ];
    // this.filCategory = [
    //   {label: 'All', value: 'all'},
    //   {label: 'Electrician', value: 'Electrician'},
    //   {label: 'Plumber', value: 'Plumber'},
    //   {label: 'Carpenter', value: 'Carpenter'},
    //   {label: 'GT', value: 'gt'},
    //   {label: 'Janitor', value: 'janitor'}
    // ];
    this.getCategory();
  }

  getCategory() {
    this.filCategory = [];
    this.srv.getAllCategory().subscribe(d => {
      console.log('---->', d);
      for (let i = 0; i < d.data.length; i++) {
        let row = d.data[i];
        this.filCategory.push({
          label: row.title,
          value: row.id
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

  filterData(t, v) {
    let op = ['Open', 'Close', 'Assigned', 'Esclated', 'Unresolved'];
    this.gs.spin(true);
    let param = '2/' + (t == undefined ? 0 : t) + '/' + (v == undefined ? 0 : v);
    try {
      this.srv.getTicket(param).subscribe(resp => {
        this.gs.spin(false);
        if (resp.data == {}) {
          this.gs.cTicketSrc.next([]);
        } else {
          this.gs.cTicketSrc.next(resp.data);
        }

      });
    } catch (e) {
      this.gs.spin(false);
      console.log('Error', e);
    }
  }
  getTickets() {
    let op = ['Open', 'Close', 'Assigned', 'Esclated', 'Unresolved'];
    this.gs.spin(true);
    try {
      this.gs.getTicket('2/0/0').subscribe(resp => {
        this.gs.spin(false);
        this.tickets = [];
        for (let i = 0; i < resp.data.length; i++) {
          let d = resp.data[i];
          this.tickets.push({
            assign_status: d.assign_status,
            assigned_user: d.assigned_user,
            assigned_user_details: d.assigned_user_details,
            attachments: d.attachments,
            booking_date: d.booking_date,
            brief: d.brief,
            category_id: this.getServById(d.category_id),
            createdAt: this.gs.LocalTimeString(d.createdAt),
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
          })
        }
      });
    } catch (e) {
      console.log('Error', e);
    }
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
      })
    }
    console.log('Open tickets', this.tickets);
  }

}
