import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule, Http, Headers } from '@angular/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Globals } from './_utlity/globals';
import { AppComponent } from './app.component';
import { AppPrimeNGModule } from './app-primeng.module';
import { AppBootstrapModule } from './app-bootstrap.module';
import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule } from 'ngx-toastr';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {ToastModule} from 'primeng/toast';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import * as moment from 'moment';
import {TblComponent} from './_directives/tbl/tbl.component';
import { HeaderComponent } from './_shared/layout/header/header.component';
import { FooterComponent } from './_shared/layout/footer/footer.component';
import { SidenavComponent } from './_shared/layout/sidenav/sidenav.component';
import { InitialComponent } from './_shared/initial/initial.component';
import { MainComponent } from './_shared/main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { HomeComponent } from './dashboard/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaintenanceComponent } from './dashboard/maintenance/maintenance.component';
import { OpenComponent } from './dashboard/maintenance/open.component';
import { ClosedComponent } from './dashboard/maintenance/closed.component';
import { AssignedComponent } from './dashboard/maintenance/assigned.component';
import { EscalatedComponent } from './dashboard/maintenance/escalated.component';
import { UnresolvedComponent } from './dashboard/maintenance/unresolved.component';

import { BookingComponent } from './dashboard/booking/booking.component';
import { ComplaintsComponent } from './dashboard/complaints/complaints.component';
import { NoticesComponent } from './dashboard/notices/notices.component';
import { VisitorsComponent } from './dashboard/visitors/visitors.component';
import { UsersComponent } from './dashboard/users/users.component';
import { StaffsComponent } from './dashboard/staffs/staffs.component';
import { DomesticHelperComponent } from './dashboard/domestic-helper/domestic-helper.component';
import { AdsComponent } from './dashboard/ads/ads.component';
import { EventsComponent } from './dashboard/events/events.component';
import { NotificationPushComponent } from './dashboard/notification-push/notification-push.component';
import { NotificationEmailComponent } from './dashboard/notification-email/notification-email.component';
import { NotificationSMSComponent } from './dashboard/notification-sms/notification-sms.component';
import { VehiclesComponent } from './dashboard/vehicles/vehicles.component';
import { SosComponent } from './dashboard/sos/sos.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { AboutComponent } from './dashboard/about/about.component';
import { HelpSupportComponent } from './dashboard/help-support/help-support.component';
import { ContactComponent } from './dashboard/contact/contact.component';
import { CommunitiesComponent } from './dashboard/communities/communities.component';

// Master
import { MtMaintenanceComponent } from './dashboard/master/mt-maintenance/mt-maintenance.component';
import { MtbookingComponent } from './dashboard/master/mtbooking/mtbooking.component';
import { MtsocietycategoryComponent } from './dashboard/master/mtsocietycategory/mtsocietycategory.component';
import { MtcomplaintcategoryComponent } from './dashboard/master/mtcomplaintcategory/mtcomplaintcategory.component';
import { MtdomestichelpercategoryComponent } from './dashboard/master/mtdomestichelpercategory/mtdomestichelpercategory.component';
import { MtsoscategoryComponent } from './dashboard/master/mtsoscategory/mtsoscategory.component';
import { VehiclesMasterComponent } from './dashboard/vehicles-master/vehicles-master.component';
import { StaffsMasterComponent } from './dashboard/staffs-master/staffs-master.component';
import { DomesticHelperMasterComponent } from './dashboard/domestic-helper-master/domestic-helper-master.component';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';

// Services
import { CountryService } from './_services/countryservice';
import { RestService } from './_services/rest.service';
import { GlobalService } from './_services/global.service';
import { UserService } from './_services/user.service';
import { BookingService } from './_services/booking.service';
import { ComplaintService } from './_services/complaint.service';
import { SosService } from './_services/sos.service';
import { SocietyService } from './_services/society.service';
import { MaintenanceService } from './_services/maintenance.service';
import { StaffService } from './_services/staff.service';
import { AlertComponent } from './_directives/alert/alert.component';
import { UdatePipe } from './_pipes/udate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TblComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    InitialComponent,
    MainComponent,
    LoginComponent,
    ForgotComponent,
    HomeComponent,
    NotFoundComponent,
    MaintenanceComponent,
    OpenComponent,
    ClosedComponent,
    AssignedComponent,
    EscalatedComponent,
    UnresolvedComponent,
    MtMaintenanceComponent,
    MtbookingComponent,
    MtsocietycategoryComponent,
    MtcomplaintcategoryComponent,
    MtdomestichelpercategoryComponent,
    MtsoscategoryComponent,
    BookingComponent,
    ComplaintsComponent,
    NoticesComponent,
    VisitorsComponent,
    UsersComponent,
    StaffsComponent,
    DomesticHelperComponent,
    AdsComponent,
    EventsComponent,
    NotificationPushComponent,
    NotificationEmailComponent,
    NotificationSMSComponent,
    VehiclesComponent,
    SosComponent,
    ReportsComponent,
    AboutComponent,
    HelpSupportComponent,
    ContactComponent,
    CommunitiesComponent,
    AlertComponent,
    UdatePipe,
    VehiclesMasterComponent,
    StaffsMasterComponent,
    DomesticHelperMasterComponent,
    ChangePasswordComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppPrimeNGModule,
    AppBootstrapModule,
    HttpClientModule,
    HttpModule,
    SnotifyModule,
    
    // NotificationsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    // SimpleNotificationsModule.forRoot(), // Use forRoot() method
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [Globals, CountryService, RestService, GlobalService, UserService,
    // NotificationsService
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    BookingService, ComplaintService, SosService, SocietyService, MaintenanceService,
    StaffService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
