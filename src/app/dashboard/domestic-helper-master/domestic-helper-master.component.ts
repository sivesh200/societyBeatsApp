import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MenuItem, SelectItem } from '../../_shared/common/api';

@Component({
  selector: 'app-domestic-helper-master',
  templateUrl: './domestic-helper-master.component.html',
  styleUrls: ['./domestic-helper-master.component.css']
})
export class DomesticHelperMasterComponent implements OnInit {
  //export class NoticesComponent implements OnInit {

  category: SelectItem[];
  selcategory: string[] = [];

  @Output() delete = new EventEmitter();

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
  Mconfig = { class: 'modal-ex-lg' };
  constructor(private modalService: BsModalService) {

    this.category = [
      { label: 'Cleaner', value: 'Cleaner' },
      { label: 'Cook', value: 'Cook' },
      { label: 'Washer', value: 'Washer' }
    ];
    this.data = [
      { d1: 'DH8989', d2: 'Cleaner', d3: 'Ram Sing', d4: '9811445967', d5: '9811445967', d6:'<a href="javascript:void(0)"><i class="pi pi-file"></i></a>', d7:'<a href="javascript:void(0)"><i class="pi pi-file"></i></a>'},
      { d1: 'DH5656', d2: 'Washer', d3: 'Pawan Kumar', d4: '7078364835', d5: '9811445967', d6:'<a href="javascript:void(0)"><i class="pi pi-file"></i></a>', d7:'<a href="javascript:void(0)"><i class="pi pi-file"></i></a>'},
      { d1: 'DH6543', d2: 'Cleaner', d3: 'Chet Ram', d4: '60482674859', d5: '9811445967', d6:'<a href="javascript:void(0)"><i class="pi pi-file"></i></a>', d7:'<a href="javascript:void(0)"><i class="pi pi-file"></i></a>' },
      { d1: 'DH4567', d2: 'Cook', d3: 'Kishor kumar', d4: '9846372835', d5: '9811445967', d6:'<a href="javascript:void(0)"><i class="pi pi-file"></i></a>', d7:'<a href="javascript:void(0)"><i class="pi pi-file"></i></a>'}
    ];
    this.cols = [
      { field: 'd1', header: 'Emp ID', sort: true, visible: true },
      { field: 'd2', header: 'Category', sort: true, visible: true },
      { field: 'd3', header: 'Name', sort: false, visible: false },
      { field: 'd4', header: 'Phone/Email', sort: false, visible: true },
      { field: 'd5', header: 'Alternate Contact', sort: false, visible: true },
      { field: 'd6', header: 'Id Proof', sort: false, visible: true },
      { field: 'd7', header: 'Address Proof', sort: false, visible: true },
      { field: 'd8', header: 'Action', sort: false, visible: true }
    ];
    this.bind();
  }

  bind() {
    const act = '<a href="javascript:void(0)"><i class="pi pi-file"></i></a><a href="javascript:void(0)"><i class="pi pi-pencil"></i></a><a href="javascript:void(0)"><i class="pi pi-trash"></i></a>';
    // let act = `<a href="javascript:void(0) (click)='showAuthor($event, 1)'>Show</a>`;
    for (let i = 0; i < this.data.length; i++) {
      this.data[i]['action'] = act;
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.Mconfig);
  }
  ngOnInit() {
  }

}
