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
  selector: 'app-staffs-master',
  templateUrl: './staffs-master.component.html',
  styleUrls: ['./staffs-master.component.css']
})
export class StaffsMasterComponent implements OnInit {
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
  staff = {
    category_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    image: null,
    permanent_address: '',
    present_address: '',
    kyc_document1: null,
    kyc_document2: null,
    referral_info: ''
  };
  Category: any[];
  selCate: any;
  image={
    file1:null,
    file2:null,
    file3:null
  };
  constructor(private modalService: BsModalService, private srv: MaintenanceService, protected st: StaffService, protected global: GlobalService, protected el: ElementRef) {
    this.getCategory();
    this.cols = [
      { field: 'image', header: 'Photo', sort: true, visible: true },
      { field: 'public_id', header: 'Public ID', sort: true, visible: true },
      { field: 'first_name', header: 'First Name', sort: true, visible: true },
      { field: 'last_name', header: 'Last Name', sort: true, visible: true },
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

  newStaff(){
    let param = this.staff;
    param.category_id =this.selCate.value;
    param.image = this.image.file1;
    param.kyc_document1 = this.image.file2;
    param.kyc_document2 = this.image.file3;
    
    try{
      this.st.newStaff(param).subscribe(resp=>{
        if(resp.success==true){
          this.global.success(resp.message);
          this.getStaff();
        }else{
          this.global.error(resp.message);
        }
        this.modalRef.hide();
        this.staff = {
          category_id: 0,
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          image: null,
          permanent_address: '',
          present_address: '',
          kyc_document1: null,
          kyc_document2: null,
          referral_info: ''
        };
        
      })
    }catch(e){

    }
  }

  getCategory(){
    this.Category =[];
    this.srv.getAllCategory().subscribe(d=>{
      console.log('---->',d);
      for(let i=0;i<d.data.length;i++){
        let row = d.data[i];
        this.Category.push({
          label:row.title,
          value:row.id
        });
      }
      // this.filCategory =d.data;
    });
  }

  getStaff() {
    try {
      this.global.spin(true);
      this.st.getAllStaff().subscribe(data => {
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

  changeListener($event,id) : void {
    this.readThis($event.target,id);
  }
  
  readThis(inputValue: any,id:any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image[id] = myReader.result;
      console.log('Image',this.image);
    }
    myReader.readAsDataURL(file);
  }
}

