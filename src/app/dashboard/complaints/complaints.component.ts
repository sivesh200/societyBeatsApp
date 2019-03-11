import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MenuItem } from '../../_shared/common/api';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  @Output() delete = new EventEmitter();
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
  constructor(private modalService: BsModalService) {
    this.data = [
      { image_url: '', title: 'Electrician', brief_desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', status: 'Active'},
      { image_url: '', title: 'Plumber', brief_desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', status: 'Inactive'},
      { image_url: '', title: 'Carpenter', brief_desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', status: 'Active'},
      { image_url: '', title: 'Gt', brief_desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', status: 'Inactive'},
      { image_url: '', title: 'Janitor', brief_desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', status: 'Active'}
    ];
    this.cols = [
      { field: 'image_url', header: 'image', sort: true, visible: true },
      { field: 'title', header: 'Title', sort: true, visible: true },
      { field: 'brief_desc', header: 'Brief Desc', sort: false, visible: true },
      { field: 'status', header: 'Status', sort: false, visible: true },
      { field: 'action', header: 'Action', sort: false, visible: true }
    ];

    this.bind();
  }
  
  onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
  }
  bind() {
    const act = `<a href="javascript:void(0)">
                <i class="pi pi-pencil"></i></a>
                <a href="javascript:void(0)">
                <i class="pi pi-trash"></i></a>`;
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
