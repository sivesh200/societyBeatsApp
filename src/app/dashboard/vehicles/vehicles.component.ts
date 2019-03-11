import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../_services/vehicles.service';
import { GlobalService } from '../../_services/global.service';
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  sData: any[]=[];
  history: any[]=[];
  public show: boolean = false;
  sVehicle: any;
  vShow:number=-1;
  dayFor : number=0;
  constructor(protected srv: VehiclesService, protected global:GlobalService) { 
    this.getHistory(-1,0);
  }

  ngOnInit() {
  }

  divShow(s){
    // console.log('...',s+":"+this.vShow);
    let r;
    if(this.vShow==-1){
      r = {'display':'block'};
    }else{
      if(this.vShow == s){
        r = {'display':'block'};
      }else{
        r = {'display':'none'};
      }
    }
    return r;
  }

  toggle(v) {
    try{
      this.srv.search({number:v}).subscribe(data=>{
        this.sData = data.data;
        this.show = this.sData!=null;
      })
    }catch(e){

    }
    
  }

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

  getHistory(s,d){
    try{
      let param ={
        status:(s==-1?0:s),
        date:d
      };  
      this.global.spin(true);
      this.srv.history(param).subscribe(data=>{
        this.global.spin(false);
        this.history = data.data;
        console.log('0----->',this.history);
        
        if(s==-1){
          let param ={
            status:1,
            date:d
          };  
          this.srv.history(param).subscribe(data1=>{
            this.history = this.history.concat(data1.data);
            console.log('1----->', this.history);
            
          },err=>{
            console.log('Error in Get Vechile History API---->',err);
          });
        }
      },err=>{
        console.log('Error in Get Vechile History API---->',err);
      });
      
    }catch(e){
      console.log('Error in Get Vechile History---->',e);
    }
  }

  dateString(d,o){
    return this.global.DateString(d,o);
  }

  search(){
    try{
      let param ={
        number:'1203'
      };  
      this.global.spin(true);
      this.srv.search(param).subscribe(data=>{
        this.global.spin(false);
        console.log('----->',data);
      },err=>{
        console.log('Error in Search Vechile  API---->',err);
      })
    }catch(e){
      console.log('Error in Search Vechile---->',e);
    }
  }

  update(v,s){
    try{
      let param ={
        vehicle_id:v,
        status:(s==0?1:0)
      };  
      this.global.spin(true);
      this.srv.update(param).subscribe(data=>{
        this.global.spin(false);
        console.log('----->',data);
        if(data.success==true){
          this.global.success(data.message);
        }else{
          this.global.error(data.message);
        }
        this.show=false;
        this.getHistory(this.vShow,this.dayFor);
      },err=>{
        console.log('Error in Update Vechile  API---->',err);
      })
    }catch(e){
      console.log('Error in Update Vechile ---->',e);
    }
  }
}
