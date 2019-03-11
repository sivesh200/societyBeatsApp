import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MenuItem } from '../../../_shared/common/api';
import { ElementRef } from '@angular/core';
import { MaintenanceService } from '../../../_services/maintenance.service';
import { GlobalService } from '../../../_services/global.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-mt-maintenance',
  templateUrl: './mt-maintenance.component.html',
  styleUrls: ['./mt-maintenance.component.css']
})
export class MtMaintenanceComponent implements OnInit {
  @ViewChild('template') tmpl: TemplateRef<any>;
  eMode: boolean;
  currData: any;
  cDesc: any;
  cTitle: any;
  categories: any[]=[];
  public sendAction: Function;
  actionBtns:any=[
    {id:1,title:"",icon:'pi pi-pencil',method:'edit'},
    {id:2,title:"",icon:'pi pi-trash',method:'delete'}
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
  constructor(private modalService: BsModalService, private srv: MaintenanceService, protected global: GlobalService, protected el: ElementRef) {
    this.cols = [
      { field: 'image_url', header: 'image', sort: true, visible: true },
      { field: 'title', header: 'Title', sort: true, visible: true },
      { field: 'brief_desc', header: 'Brief Desc', sort: false, visible: true },
      { field: 'status', header: 'Status', sort: false, visible: true },
    ];
    this.getCategory();
  }
  
  onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.Mconfig);
  }
  ngOnInit() {
    this.sendAction = this.action.bind(this);
  }

  getCategory() {
    try {
      this.global.spin(true);
      this.srv.getAllCategory().subscribe(data => {
        this.global.spin(false);
        if (data.success == true) {
          // let d : any[]=[];
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
    //console.log("Action",d);
    //console.log("Row",r);
    if (d.id == 1) {
      this.cTitle = r.title;
      this.cDesc = r.brief_desc;
      this.currData = r;
      this.el.nativeElement.querySelector('#showModal').click();
      this.eMode = true;
      this.openModal(this.tmpl);

    }
  }
  delCategory(id) {

  }


  createCategory() {
    let param = {
      title: this.cTitle,
      brief_desc: this.cDesc,
      image_url: this.cTitle + '.png',
      status: 1,
      isPaid: true
    };
    try {
      this.global.spin(true);
      if (this.eMode == true) {
        param = this.currData;
        param.title = this.cTitle;
        delete (param.image_url);
        param.brief_desc = this.cDesc;
        this.srv.updateCategory(param).subscribe(data => {
          this.global.spin(false);
          if (data.status == 'success') {
            this.global.success('Category successfully saved!');
            this.getCategory();
          } else {
            this.global.error('Unable to save category!');
          }
          this.currData = null;
          this.modalRef.hide();
          this.eMode = false;
        });
      } else {
        this.srv.createCategory(param).subscribe(data => {
          this.global.spin(false);
          if (data.success == true) {
            this.global.success('Category successfully saved!');
            this.getCategory();
          } else {
            this.global.error('Unable to save category!');
          }
          this.modalRef.hide();
          this.eMode = false;
        });
      }

    } catch (e) {
      console.log('Error on create booking category', e.message);
    }
  }
}
