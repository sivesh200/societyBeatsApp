import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() data;
  @Input() cols;
  @Input() detail;
  @Input() summary;
  @Input() doAction:Function;
  
  constructor(protected elm: ElementRef) {

  }

  ngOnInit() {
  }

  callAction(d){
    console.log("Action",d);
    this.doAction(this.data,d);
  }

}
