import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MenuItem, SelectItem } from '../../_shared/common/api';
import { NoticeService } from '../../_services/notice.service';
import { GlobalService } from '../../_services/global.service';
import Swal from 'sweetalert2';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {
  public sendAction: Function;
  
  image: any;
  full: any;
  desc: any;
  title: any;
  notices: any[] = [];

  cars: SelectItem[];
  selectedCars1: string[] = [];

  cars1: SelectItem[];
  selectedCars2: string[] = [];

  cities: City[];
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
  actionBtns: any = [
    { id: 1, title: "", icon: 'pi pi-pencil', method: 'edit' },
    { id: 2, title: "", icon: 'pi pi-trash', method: 'delete' }
  ];
  
  modalRef: BsModalRef;
  Mconfig = { class: 'modal-lg' };
  constructor(private modalService: BsModalService, protected srv: NoticeService, protected global: GlobalService) {

    this.cars = [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' },
      { label: 'E', value: 'E' },
      { label: 'F', value: 'F' },
      { label: 'G', value: 'G' },
      { label: 'H', value: 'H' },
      { label: 'I', value: 'I' },
      { label: 'J', value: 'J' }
    ];

    this.cars1 = [
      { label: 'Fitness Freak', value: '1' },
      { label: 'Total Tennis', value: '2' },
      { label: 'Yoga & Aerobics', value: '3' },
      { label: 'Swimming Champion', value: '4' }
    ];

    this.cities = [
      { name: 'A', code: 'A' },
      { name: 'B', code: 'B' },
      { name: 'C', code: 'C' },
      { name: 'D', code: 'D' },
      { name: 'E', code: 'E' },
      { name: 'F', code: 'F' },
      { name: 'G', code: 'G' },
      { name: 'H', code: 'H' },
      { name: 'I', code: 'I' },
      { name: 'J', code: 'J' }
    ];

    this.data = [
      { sno: '1', title: 'Lorem ipsum', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', sDate: '1 Sep 18', eDate: '30 Sep 18' },
      { sno: '2', title: 'Lorem ipsum', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', sDate: '5 Sep 18', eDate: '5 Oct 18' },
      { sno: '3', title: 'Lorem ipsum', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', sDate: '20 Sep 18', eDate: '20 Oct 18' },
      { sno: '4', title: 'Lorem ipsum', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', sDate: '25 Sep 18', eDate: '15 Oct 18' }
    ];
    this.cols = [
      { field: 'id', header: 'ID', sort: true, visible: true },
      { field: 'title', header: 'Title', sort: true, visible: true },
      { field: 'full_desc', header: 'Body', sort: false, visible: false },
      { field: 'status', header: 'Status', sort: false, visible: false },
      { field: 'createdAt', header: 'Created On', sort: false, visible: true },
      { field: 'created_by', header: 'Created By', sort: false, visible: true },

    ];

    // this.bind();
    this.getAll();
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

  action(d, r) {
    //console.log("Action",d);
    if (d.id == 2) {
      console.log('nnn', r);
      Swal({
        title: 'Are you sure to delete?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          console.log("Row",r);
          this.srv.delete({ id: r.id }).subscribe(resp => {
            if (resp.success == true) {
              Swal(
                'Deleted!',
                'Event has been deleted.',
                'success'
              );
              this.getAll();
            } else {
              Swal(
                'Failed',
                resp.error,
                'error'
              )
            }
          }, err => {
            Swal(
              'Failed',
              'Unable to delete this event :)',
              'error'
            )
          })

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal(
            'Cancelled',
            'Community member is safe :)',
            'error'
          )
        }
      });
    }
  }
  ngOnInit() {
    this.sendAction = this.action.bind(this);
  }


  newNotice() {
    try {
      let param = {
        title: this.title,
        brief_desc: this.desc,
        full_desc: this.desc,
        attachment1: this.image,
        attachment2: null
      };
      this.srv.add(param).subscribe(resp => {
        this.modalRef.hide();
        if(resp.success==true){
          this.global.success(resp.message);
          this.getAll();
        }else{
          this.global.error(resp.message);
        }
      });
    } catch (e) {

    }
  }



  getAll() {
    let n: any[] = [];
    this.srv.getAll().subscribe(resp => {
      console.log(resp.data);
      for (let i = 0; i < resp.data.length; i++) {
        let d = resp.data[i];
        n.push({
          id: d.id,
          society_id: d.society_id,
          title: d.title,
          brief_desc: d.brief_desc,
          full_desc: d.full_desc,
          status: d.status,
          read_status: d.read_status,
          attachment1: d.attachment1,
          attachment2: d.attachment2,
          created_by: d.created_by,
          updated_by: d.updated_by,
          createdAt: this.global.UTC2Local(d.createdAt),
          updatedAt: this.global.UTC2Local(d.updatedAt)
        })
      }
      this.notices = n;
      // n.push({});
    })
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      // console.log('Image',this.image);
    }
    myReader.readAsDataURL(file);
  }
}

