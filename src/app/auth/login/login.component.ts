import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Globals } from '../../_utlity/globals';
import * as constants from '../../_utlity/constants';
import { AuthService } from '../../_services/auth.service';
import { GlobalService } from '../../_services/global.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router,
    private toastr: ToastrService,
    private _global: Globals,
    private auth: AuthService,
    protected gs: GlobalService,
    protected us: UserService
  ) {

    this.auth.logout();
    localStorage.setItem('LoggedUser', null);
  }

  user = { email: '', password: '' };

  onSubmit() {
    this.gs.spin(true);

    const param = {
      email: this.user.email,
      password: this.user.password
    };

    try {
      this.gs.login(param).subscribe(data => {
        this.gs.spin(false);
        if (data.success === true) {
          this._global.authorization_token = data.token;
          console.log(constants.messages.successLogin);
          this.auth.sendToken(data.token);
          this.router.navigate(['home']);
          localStorage.setItem('LoggedUser', JSON.stringify(data.user));
          this.gs.success(constants.messages.successLogin);
        } else {
          this.gs.error(constants.messages.errorLogin);
        }
        console.log('>>>>', data);
      }, error => {
        console.log('>>>>', error);
      });
    } catch (e) {
      console.log('>>>>', e);
    }
  }
}
