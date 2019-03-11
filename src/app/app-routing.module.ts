import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { InitialComponent } from './_shared/initial/initial.component';
import { MainComponent } from './_shared/main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './dashboard/home/home.component';
import { MaintenanceComponent } from './dashboard/maintenance/maintenance.component';

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
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';

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


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '', component: InitialComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'forgot', component: ForgotComponent },
    ]
  },
  {
    path: '', component: MainComponent, children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'maintenance', component: MaintenanceComponent, canActivate: [AuthGuard] },
      { path: 'master/maintenance', component: MtMaintenanceComponent, canActivate: [AuthGuard] },
      { path: 'master/booking', component: MtbookingComponent, canActivate: [AuthGuard] },
      { path: 'master/society-category', component: MtsocietycategoryComponent, canActivate: [AuthGuard] },
      { path: 'master/complaint-category', component: MtcomplaintcategoryComponent, canActivate: [AuthGuard] },
      { path: 'master/domestic-helper-category', component: MtdomestichelpercategoryComponent, canActivate: [AuthGuard] },
      { path: 'master/sos-category', component: MtsoscategoryComponent, canActivate: [AuthGuard] },
      { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
      { path: 'complaints', component: ComplaintsComponent, canActivate: [AuthGuard] },
      { path: 'notices', component: NoticesComponent, canActivate: [AuthGuard] },
      { path: 'visitors', component: VisitorsComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'staffs-master', component: StaffsMasterComponent, canActivate: [AuthGuard] },
      { path: 'staffs-in-out', component: StaffsComponent, canActivate: [AuthGuard] },
      { path: 'domestic-helpers-master', component: DomesticHelperMasterComponent, canActivate: [AuthGuard] },
      { path: 'domestic-helpers-in-out', component: DomesticHelperComponent, canActivate: [AuthGuard] },
      { path: 'ads', component: AdsComponent, canActivate: [AuthGuard] },
      { path: 'communities', component: CommunitiesComponent, canActivate: [AuthGuard] },
      { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
      { path: 'notification-push', component: NotificationPushComponent, canActivate: [AuthGuard] },
      { path: 'notification-email', component: NotificationEmailComponent, canActivate: [AuthGuard] },
      { path: 'notification-sms', component: NotificationSMSComponent, canActivate: [AuthGuard] },
      { path: 'vehicles-master', component: VehiclesMasterComponent, canActivate: [AuthGuard] },
      { path: 'vehicles-in-out', component: VehiclesComponent, canActivate: [AuthGuard] },
      { path: 'sos', component: SosComponent, canActivate: [AuthGuard] },
      { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
      { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
      { path: 'help-support', component: HelpSupportComponent, canActivate: [AuthGuard] },
      { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },

    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
