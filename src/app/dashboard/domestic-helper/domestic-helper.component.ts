import { Component, OnInit } from '@angular/core';
import { DomesticHelperService } from '../../_services/domestic-helper.service';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-domestic-helper',
  templateUrl: './domestic-helper.component.html',
  styleUrls: ['./domestic-helper.component.css']
})
export class DomesticHelperComponent implements OnInit {
  public show: boolean = false;
  status :number=-1;
  date:number=0;
  helpers: any[]=[];
  current: any;
  constructor(protected srv : DomesticHelperService,protected global:GlobalService) {
    this.getHelpers(0,0);
   }

  ngOnInit() {
  }

  toggle(q) {
    this.show = true;// !this.show;
    let param ={
      keyword:q
    };
    try{
      this.srv.serachHelpers(param).subscribe(resp=>{
        this.current = resp.data;
      })
    }catch(e){

    }
  }

  update(id,status){
    let param={
      domestic_helper_id:id,
      status:status
    };
    try{
      this.srv.updateHelpers(param).subscribe(resp=>{
        if(resp.success==true){
          this.global.success(resp.message);
          this.getHelpers(this.date,this.status);
        }else{
          this.global.error(resp.message)
        }
        this.show=false;
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

  getHelpers(d,s){
    this.date=d;
    this.status=s;
    let param:any
    if(this.status == -1){
      param = {
        date:this.date
      };
    }else{
      param = {
        status : this.status,
        date:this.date
      };
    }
    try{
      this.srv.getHelpers(param).subscribe(resp=>{
        this.helpers = resp.data;
        console.log('---->',resp);
      })
    }catch(e){

    }
    
  }
}
