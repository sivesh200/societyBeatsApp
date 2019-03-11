import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MenuItem } from '../../_shared/common/api';
import { ElementRef } from '@angular/core';
import { MaintenanceService } from '../../_services/maintenance.service';
import { StaffService } from '../../_services/staff.service';
import { GlobalService } from '../../_services/global.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('template') tmpl: TemplateRef<any>;
  eMode: boolean;
  currData: any;
  cDesc: any;
  cTitle: any;
  categories: any[] = [];
  public sendAction: Function;
  actionBtns: any = [
    { id: 1, title: "", icon: 'pi pi-pencil', method: 'edit' },
    { id: 2, title: "", icon: 'pi pi-trash', method: 'delete' }
  ];


  uploadedFiles: any[] = [];
  cols: any[] = [];
  data: any[];
  items: MenuItem[];
  config: any = {
    paginator: true, // Done
    sorting: true, // Done
    search: true, // Done
    export: true, // done,
    colfilter: true,
    offset: '7'
  };

  modalRef: BsModalRef;
  Mconfig = { class: 'modal-lg' };
  constructor(private modalService: BsModalService, private srv: MaintenanceService, protected st: StaffService, protected global: GlobalService, protected el: ElementRef) {
   
    this.cols = [
      { field: 'picture', header: 'Photo', sort: true, visible: true },
      { field: 'first', header: 'Full Name', sort: true, visible: true },
      { field: 'email', header: 'Email', sort: false, visible: false },
      { field: 'phone', header: 'Phone', sort: false, visible: true },
      { field: 'serviceType', header: 'Service Type', sort: false, visible: true },
      { field: 'status', header: 'Status', sort: false, visible: true },
      { field: 'action', header: 'Action', sort: false, visible: true }
    ];
    this.getStaff();
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.Mconfig);
  }
  ngOnInit() {
    this.sendAction = this.action.bind(this);
  }

  getStaff() {
    try {
      this.global.spin(true);
      this.st.getAllUser().subscribe(data => {
        this.global.spin(false);
        if (data.success == true) {
          this.categories = [];
          data.data.forEach(r => {
            r.image_url = "<img src='" + './assets/images/' + r.image_url + "' height='50' onerror=\"this.src='./assets/images/no-image.png'\">";
            r.status = (r.status == 1 ? 'Active' : 'Inactive');
            this.categories.push(r);
          });
        }
      });
    } catch (e) {
      console.error(e.message);
    }
  }
  action(d, r) {
    if (d.id == 1) {
      this.cTitle = r.title;
      this.cDesc = r.brief_desc;
      this.currData = r;
      this.el.nativeElement.querySelector('#showModal').click();
      this.eMode = true;
      this.openModal(this.tmpl);

    }
  }  
}

