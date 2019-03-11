import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MenuItem } from '../../_shared/common/api';
import { ComunitiesService } from '../../_services/comunities.service';
import { GlobalService } from '../../_services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css']
})
export class CommunitiesComponent implements OnInit {
  image: any;
  members: any[] = [];
  communities: any[] = [];
  baseUrl:string ='http://213.136.93.43:3000/v1/';
  public sendAction: Function;
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

  title: string;
  desc: string;
  modalRef: BsModalRef;
  Mconfig = { class: 'modal-lg' };
  currCommunity: any;

  actionBtns: any = [
    // {id:1,title:"",icon:'pi pi-pencil',method:'edit'},
    { id: 2, title: "", icon: 'pi pi-trash', method: 'delete' }
  ];
  // this.config: any = {
  //   paginator: true, // Done
  //   sorting: true, // Done
  //   search: true, // Done
  //   export: true, // done,
  //   colfilter: true,
  //   offset: '7'
  // };

  constructor(private modalService: BsModalService, protected srv: ComunitiesService, protected global: GlobalService) {

    this.cols = [
      { field: 'sno', header: 'S.No', sort: false, visible: true },
      { field: 'name', header: 'Name', sort: true, visible: true },
      { field: 'email', header: 'Email', sort: true, visible: true },
      { field: 'tower', header: 'Tower', sort: false, visible: false },
      { field: 'floor', header: 'Floor', sort: false, visible: true },
      { field: 'flat', header: 'Flat No', sort: false, visible: true },
    ];

    // this.bind();
    this.getAll();
  }

  bind() {
    const act = `<a href="javascript:void(0)"><i class="pi pi-trash"></i></a>`;
    // let act = `<a href="javascript:void(0) (click)='showAuthor($event, 1)'>Show</a>`;
    for (let i = 0; i < this.data.length; i++) {
      this.data[i]['action'] = act;
    }
  }

  editModal(createEvent: TemplateRef<any>, x) {
    this.currCommunity = x;
    this.title = x.title;
    this.desc = x.desc;
    this.getAllMembers(x.id);
    this.modalRef = this.modalService.show(createEvent, this.Mconfig);
  }
  openModal(createEvent: TemplateRef<any>) {
    this.modalRef = this.modalService.show(createEvent, this.Mconfig);
  }

  getAllMembers(id) {
    let m: any[] = [];
    try {
      this.srv.getAllMembers(id).subscribe(data => {
        if (data.success == true) {
          // this.global.success(data.message);
          let d = data.data;
          for (let i = 0; i < d.length; i++) {
            let r = {
              sno: i + 1,
              uid: d[i].user_details.id,
              name: d[i].user_details.first + ' ' + d[i].user_details.last,
              tower: d[i].user_details.tower,
              floor: d[i].user_details.floor,
              flat: d[i].user_details.flat,
              phone: d[i].user_details.phone,
              pic: d[i].user_details.picture,
              email: d[i].user_details.email,
            };
            m.push(r);
            console.log('----->', r);
          }
          this.members = m;
          console.log('----->', m);
        } else {
          this.global.error(data.message);
        }
        console.log('----->', data);
        // this.global.success()
      }, err => {
        this.global.error('Unable to add community');
      })
    } catch (e) {

    }
  }
  getAll() {
    try {
      this.srv.get().subscribe(data => {
        if (data.success == true) {
          // this.global.success(data.message);
          this.communities = data.data;
        } else {
          this.global.error(data.message);
        }
        console.log('----->', data);
        // this.global.success()
      }, err => {
        this.global.error('Unable to add community');
      })
    } catch (e) {

    }
  }

  add() {
    if (this.title == '' || this.title == null || this.title == undefined) {
      this.global.error('Please enter community title :)');
      return;
    } else if (this.desc == '' || this.desc == null || this.desc == undefined) {
      this.global.error('Please enter community description :)');
      return;
    }
    let param = {
      image: this.image,
      title: this.title,
      brief_desc: this.desc,
      full_desc: this.desc
    }
    console.log('--->', param);

    try {
      this.srv.addCommunity(param).subscribe(data => {
        if (data.success == true) {
          this.global.success(data.message);
          this.getAll();
        } else {
          this.global.error(data.message);
        }
        this.title = '';
        this.desc = '';
        console.log('----->', data);
        // this.global.success()
      }, err => {
        this.global.error('Unable to add community');
        this.title = '';
        this.desc = '';
      })
      this.modalRef.hide()
    } catch (e) {
      console.log('...', e);
      this.global.error('Unable to add community');
      this.title = '';
      this.desc = '';
    }
  }

  action(d, r) {
    //console.log("Action",d);
    //console.log("Row",r);
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
          this.srv.delMember({ id: r.uid }).subscribe(resp => {
            if (resp.success == true) {
              Swal(
                'Deleted!',
                'Event has been deleted.',
                'success'
              );
              this.getAllMembers(2);
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

  uploaded(e) {
    console.log('Uploaded file', e);
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log('Image', this.image.toString().length);
    }
    myReader.readAsDataURL(file);
  }
}
