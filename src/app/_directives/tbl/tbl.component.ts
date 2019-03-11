import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tbl',
  templateUrl: './tbl.component.html',
  styleUrls: ['./tbl.component.css']
})

export class TblComponent implements OnInit, AfterViewInit {
  @Input() data;
  @Input() cols;
  @Input() config;
  @Input() actions;
  @Input() doAction:Function;
  @Output() authorClick: EventEmitter<String> = new EventEmitter<String>(); // creating an output event

  selectedColumns: any[];
  selectedData: any;
  constructor(protected elm: ElementRef) {
    this.config = {
      paginator: true,
      sorting: true,
      search: true,
      export: true,
      colfilter: true,
      offset: '5',
    };
    this.selectedData = {};
    this.selectedColumns = this.cols;
  }

  ngAfterViewInit() {
    // this.cols.push({ field: 'action', header: 'Action', sort: false, visible: true })
  }
  fireMyEvent(evt) {
    // this.my
  }

  ngOnInit() {
  }

  showAuthor(event, author) {
    this.authorClick.emit(author); // emmiting the event.
  }

  callAction(d,r){
    console.log("Action",d);
    this.doAction(d,r);
  }


}
