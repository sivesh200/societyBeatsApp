import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../_services/global.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {
  address: any;
  email: any;
  phone: any;
  vname: any;
  flatno: any;
  visitor: any[] = [];
  mTower: any[];
  mTowerSelect: any;
  flatOwner:string='';
  flatToken:string='';
  status:string=null;
  date:number=0;
  keyword:string='';
  constructor(protected global: GlobalService) {
    this.global.towers.subscribe(data=> this.mTower = data);
    this.getTower();
    this.getVisitor();
  }
  ngOnInit() {
  }
  
  getTower() {
    this.global.getTower().subscribe(data => {
      this.global.towerSrc.next(data.data);
    });
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
      this.flatOwner = resp.data.name;
      this.flatToken = resp.data.floor_no;
    })
  }
  searchVisitor(){
    let param = {
      keyword:this.keyword
    };
    this.global.spin(true);
    this.global.visitorSearch(param).subscribe(resp => {
      this.global.spin(false);
      this.visitor = resp.data;
    })
  }
  // Rohit Changes
  onButtonGroupClick($event) {
    let clickedElement = $event.target || $event.srcElement;
    if (clickedElement.nodeName === "BUTTON") {
      let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
      // if a Button already has Class: .active
      if (isCertainButtonAlreadyActive) {
        isCertainButtonAlreadyActive.classList.remove("active");
      }
      clickedElement.className += " active";
    }
  }

  getVisitor() {

    try {
      let param;
      if(this.status==null){
        param ={
          date:this.date
        };
      }else{
        param ={
          status :this.status,
          date:this.date
        };
      }
      
      this.global.spin(true);
      this.global.getVisitosr(param).subscribe(resp => {
        this.global.spin(false);
        let  d = resp.data.toString();
        if(Array.isArray(resp.data)){
          this.visitor = resp.data;
        }else{
          this.visitor = [];
        }
        

      })
    } catch (e) {
      console.log('GetVisi',e);
      this.global.spin(false);
    }
  }
  

  addVisitor() {
    let param = {
      flat_id: this.flatToken,
      full_name: this.vname,
      mobile_number: this.phone,
      email_id: this.email,
      place: this.address
    };
    try{
      this.global.spin(true);
      this.global.visitorIn(param).subscribe(resp=>{
        this.global.spin(false);
        console.log('----->',resp)
        if(resp.success==true){
          this.getVisitor();
          this.global.success(resp.message);
        }else{
          this.global.error(resp.message);
        }
      })
    }catch(e){
      this.global.spin(false);
    }
  }

  outVisit(d){
    let param = {
      id:d.id
    };
    try{
      this.global.spin(true);
      this.global.visitorOut(param).subscribe(resp=>{
        this.global.spin(false);
        console.log('----->',resp)
        if(resp.success==true){
          this.global.success(resp.message);
          this.getVisitor();
        }else{
          this.global.error(resp.message);
        }
      })
    }catch(e){
      this.global.spin(false);
    }
  }
}
