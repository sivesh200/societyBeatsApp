import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { GlobalService } from '../../_services/global.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MenuItem, SelectItem } from '../../_shared/common/api';
import { VehiclesService } from 'src/app/_services/vehicles.service';

@Component({
  selector: 'app-vehicles-master',
  templateUrl: './vehicles-master.component.html',
  styleUrls: ['./vehicles-master.component.css']
})
export class VehiclesMasterComponent implements OnInit {
  //export class NoticesComponent implements OnInit {

  tower: SelectItem[];
  selTower: string[] = [];

  modelY: SelectItem[];
  selModelY: string[] = [];

  make: SelectItem[];
  selMake: string[] = [];

  color: SelectItem[];
  selColor: string[] = [];

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
  Mconfig = { class: 'modal-lg' };
  mTower: any[];
  mTowerSelect: any;
  flatOwner: any;
  flatToken: any;
  constructor(private modalService: BsModalService,protected global :GlobalService, protected srv:VehiclesService) {
    this.global.towers.subscribe(data=> this.mTower = data);
    this.getTower();

    this.modelY = [
      { label: '2019', value: '2019' },
      { label: '2018', value: '2018' },
      { label: '2017', value: '2017' },
      { label: '2016', value: '2016' },
      { label: '2015', value: '2015' },
      { label: '2014', value: '2014' },
      { label: '2013', value: '2013' },
      { label: '2012', value: '2012' },
      { label: '2011', value: '2011' },
      { label: '2010', value: '2010' }
    ];
    this.make = [
      {label: 'Audi', value: 'Audi'},
      {label: 'BMW', value: 'BMW'},
      {label: 'Fiat', value: 'Fiat'},
      {label: 'Ford', value: 'Ford'},
      {label: 'Honda', value: 'Honda'},
      {label: 'Jaguar', value: 'Jaguar'},
      {label: 'Mercedes', value: 'Mercedes'},
      {label: 'Renault', value: 'Renault'},
      {label: 'VW', value: 'VW'},
      {label: 'Volvo', value: 'Volvo'},
      {label: 'Other', value: 'Other'}
    ];
    this.color = [
      {label: 'Silver', value: 'Silver'},
      {label: 'White', value: 'White'},
      {label: 'Gray', value: 'Gray'},
      {label: 'Black', value: 'Black'},
      {label: 'Blue', value: 'Blue'},
      {label: 'Red', value: 'Red'},
      {label: 'Light Brown', value: 'Light Brown'},
      {label: 'Green', value: 'Green'},
      {label: 'Yellow', value: 'Yellow'},
      {label: 'Orange', value: 'Orange'},
      {label: 'Other', value: 'Other'}
    ];
    this.data = [
      { d1: 'DL 5CN 5175', d2: '4 Wheeler', d3: '2018', d4: 'Honda', d5: 'City', d6:'White', d7:'G', d8:'1204'},
      { d1: 'DL 5XD 2322', d2: '2 Wheeler', d3: '2018', d4: 'TVS', d5: 'Jupiter', d6:'Black', d7:'A', d8:'201' },
      { d1: 'DL 5CN 5175', d2: '4 Wheeler', d3: '2018', d4: 'Honda', d5: 'City', d6:'White', d7:'G', d8:'1204' },
      { d1: 'DL 5XD 2322', d2: '2 Wheeler', d3: '2018', d4: 'TVS', d5: 'Jupiter', d6:'Black', d7:'A', d8:'201' }
    ];
    this.cols = [
      { field: 'd1', header: 'Registration No', sort: true, visible: true },
      { field: 'd2', header: 'Type', sort: true, visible: true },
      { field: 'd3', header: 'Model Year', sort: false, visible: false },
      { field: 'd4', header: 'Make', sort: false, visible: true },
      { field: 'd5', header: 'Model', sort: false, visible: true },
      { field: 'd6', header: 'color', sort: false, visible: true },
      { field: 'd7', header: 'Tower', sort: false, visible: true },
      { field: 'd8', header: 'Flat No', sort: false, visible: true },
      { field: 'd9', header: 'Action', sort: false, visible: true }
    ];
    this.bind();
  }

  searchFlat(e){
    //this.values = event.target.value;
    let param = {
      tower_id: this.mTowerSelect.id,
      flat_address: e.target.value
    };
    this.global.spin(true);
    this.global.getFlatInfo(param).subscribe(resp => {
      this.global.spin(false);
      try{
        this.flatOwner = resp.data.name;
        this.flatToken = resp.data.floor_no;
      }catch(e){}
      
    })
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

  getTower() {
    this.global.getTower().subscribe(data => {
      this.global.towerSrc.next(data.data);
    });
  }
  
  ngOnInit() {
  }

}
