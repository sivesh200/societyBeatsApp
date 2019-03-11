import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { Globals } from '../../../_utlity/globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public isCollapsed = true;
  constructor(private auth: AuthService, public _global: Globals, private router: Router) { }
  onClick(path: string) {
    this._global.isNavBarActive = false;
    this.router.navigate([path]);
  }
  ngOnInit() {
  }

}
