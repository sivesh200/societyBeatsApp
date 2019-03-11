import { Injectable } from '@angular/core';
import { RestService } from '../_services/rest.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Config } from 'protractor';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
import * as moment from 'moment';
import '../_helpers/conf';
 // import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  style = 'material';
  title = 'Snotify title!';
  body = 'Lorem ipsum dolor sit amet!';
  link: string = 'http://213.136.93.43:3000/v1/images/';
  timeout = 3000;
  position: SnotifyPosition = SnotifyPosition.rightBottom;
  progressBar = true;
  closeClick = true;
  newTop = true;
  filterDuplicates = false;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6; 
  pauseHover = true;
  titleMaxLength = 15;
  bodyMaxLength = 80;



  oTicketSrc = new BehaviorSubject([]);
  oTicket = this.oTicketSrc.asObservable();
  cTicketSrc = new BehaviorSubject([]);
  cTicket = this.cTicketSrc.asObservable();
  aTicketSrc = new BehaviorSubject([]);
  aTicket = this.aTicketSrc.asObservable();
  eTicketSrc = new BehaviorSubject([]);
  eTicket = this.eTicketSrc.asObservable();
  uTicketSrc = new BehaviorSubject([]);
  uTicket = this.uTicketSrc.asObservable();

  servicesSrc = new BehaviorSubject([]);
  services = this.servicesSrc.asObservable();

  towerSrc = new BehaviorSubject([]);
  towers = this.towerSrc.asObservable();

  tSlotSrc = new BehaviorSubject([]);
  tSlot = this.tSlotSrc.asObservable();

  StaffSrc = new BehaviorSubject([]);
  Staff = this.StaffSrc.asObservable();

  LoggedUser: any;
  Token: any;

  constructor(protected rest: RestService, private spinnerService: Ng4LoadingSpinnerService,
    // protected Notify:NotificationsService
    private snotifyService: SnotifyService,
    // private messageService: MessageService
  ) {

  }

  getImagePath(x){
    
  }
  clear() {
    // this.messageService.clear();
  }

  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
        // filterDuplicates: this.filterDuplicates
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }

  // Home Page
  login(param) {
    return this.rest.post('admin/users/login', param);
  }

  upload(param) { return this.rest.post('upload', param); }
  // Maintenance
  createTicket(param) {
    return this.rest.post('admin/maintanence/create-ticket', param);
  }
  updateTicket(param) {
    return this.rest.put('admin/maintanence/update-ticket', param);
  }
  getTicket(catId) {
    return this.rest.get('admin/maintanence/get-all-ticket/' + catId , {});
  }

  getFlatInfo(param){return this.rest.post('admin/maintanence/flat-info',param);}
  getVisitosr(param) {return this.rest.post('visitors/get-all-visitors',param);}
  visitorSearch(param){return this.rest.post('admin/visitor/search',param);}
  visitorIn(param){return this.rest.post('admin/visitor/in',param);}
  visitorOut(param){return this.rest.put('admin/visitor/out',param);}
  // Get all tickets
  getTickets(id) {
    console.log('Global ------------->','getTicket Trigged');
    if(id.toString().indexOf('/')==-1){
      id=id+'/0/0';
    }
    let op = ['Open', 'Close', 'Assigned', 'Esclated', 'Unresolved'];
    this.spin(true);
    try {
      this.getTicket(id).subscribe(resp => {
        this.spin(false);
        switch (id) {
          case 1: // Open
            this.oTicketSrc.next(resp.data);
            break;
          case 2: // Close
            this.cTicketSrc.next(resp.data);
            break;
          case 3: // Assigned
            this.aTicketSrc.next(resp.data);
            break;
          case 4: // ESCLATED
            this.eTicketSrc.next(resp.data);
            break;
          case 5: // UNRESLOVED
            this.uTicketSrc.next(resp.data);
            break;

        }
        console.log(id + ' Ticket', resp.data);


      },err=>{
        this.spin(false);
        
      });
    } catch (e) {
      this.spin(false);
      
      console.log('Error', e);
    }
  }

  getServices() {
    return this.rest.get('admin/maintanence/get-all-category', {});
  }
  getTower() {
    return this.rest.get('admin/tower/get-all-tower', {});
  }
  getTimeslot(catId) {
    return this.rest.get('admin/maintanence/get-timeslot/' + catId, {});
  }

  getStaff() {
    return this.rest.get('admin/staff', {});
  }

  spin(stat: boolean) {
    if (stat === true) {
      this.spinnerService.show();
    } else {
      this.spinnerService.hide();
    }

  }

  success(msg: any, title: string = 'Success', time: any = 3000) {
    this.snotifyService.success(msg, title, this.getConfig());
  }

  error(msg: any, title: string = 'Error', time: any = 3000) {
    this.snotifyService.error(msg, title, this.getConfig());
  }

  warn(msg: any, title: string = 'Warning', time: any = 3000) {
    this.snotifyService.warning(msg, title, this.getConfig());
  }

  info(msg: any, title: string = 'Information', time: any = 3000) {
    this.snotifyService.info(msg, title, this.getConfig());
  }

  simple(msg: any, title: string = '', time: any = 3000) {
    this.snotifyService.simple(msg, title, this.getConfig());
  }



  LocalTimeString(ms) {
    // let d = new Date(ms);
    // let res = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    // res += ' ' + d.getHours() + ':' + d.getMinutes();
    // return res;
    var d = new Date(ms);
    let myMoment: moment.Moment = moment(d);
    return myMoment.format('YYYY-MM-DD hh:mm A');
  }

  TimeString(ms, s = 0) {
    var d = new Date(parseFloat(ms));
    let myMoment: moment.Moment = moment(d);
    return myMoment.format('YYYY-MM-DD') + (s == 0 ? ' 00:00:00' : ' 23:59:59');
  }

  getTimeStamp() {
    var time = new Date().getTime();
    var d = new Date(time);
    let myMoment: moment.Moment = moment(d);
    let Timestamp = {
      sCreadedOn: time,
      sCreadedOn_Str: myMoment.format('YYYY-MM-DD hh:mm A'),
      sUpdatedOn: time,
      sUpdatedOn_Str: myMoment.format('YYYY-MM-DD hh:mm A')
    }
    return Timestamp;
  }

  DateString(str: string, op: number = 0) {
    try{
      let d:string[] = str.split('T');
      let t:string[] = d[1].split('.');
      let date = d[0];
      let time = t[0];
      if (op == 0) {
        // console.log('----->',date);
        return date; //Return Date
      } else {
        // console.log('----->',time);
        return time; //Return TIme
      }  
    }catch(e){
      // console.log('...',e);
      return '';
    }
    
  }

  DateString1(str: string, op: number = 0) {
    if (op == 0) {
      return str.split(' ')[0]; //Return Date
    } else {
      return str.split(' ')[1]; //Return TIme
    }
  }

  UTC2Local(str) {
    var d = new Date(str);
    var n: string = d.toUTCString();
    return n.replace('GMT', '');
  }
}
