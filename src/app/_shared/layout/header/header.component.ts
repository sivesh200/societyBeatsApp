import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { Globals } from '../../../_utlity/globals';
import { MenuItem } from '../../../_shared/common/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, public _global: Globals) { }
  userItem: MenuItem[];
  notiItem: MenuItem[];
  items: MenuItem[];
  display: any;
  ngOnInit() {

    this.items = [
      {
        label: 'Dashboard',
        routerLink: ['/home'],
        command: (event: any) => {
          this.display = false;
        }
      },
      {
        label: 'Master',
        items: [{
          label: '-',
        },
        {
          label: 'Maintenance',
          routerLink: ['/master/maintenance'],
          command: (event: any) => {
            this.display = false;
          }
        },
        {
          label: 'Booking',
          routerLink: ['/master/booking'],
          command: (event: any) => {
            this.display = false;
          }
        },
        {
          label: 'Society',
          routerLink: ['/master/society-category'],
          command: (event: any) => {
            this.display = false;
          }
        },
        {
          label: 'Complaint',
          routerLink: ['/master/complaint-category'],
          command: (event: any) => {
            this.display = false;
          }
        },
        {
          label: 'Domestic Helper',
          routerLink: ['/master/domestic-helper-category'],
          command: (event: any) => {
            this.display = false;
          }
        },
        {
          label: 'SOS',
          routerLink: ['/master/sos-category'],
          command: (event: any) => {
            this.display = false;
          }
        }
        ]
      },
      {
        label: 'Maintenance',
        routerLink: ['/maintenance'],
        command: (event: any) => {
          this.display = false;
        }
      },
      {
        label: 'Booking',
        routerLink: ['/booking'],
        command: (event: any) => {
          this.display = false;
        }
      },
      {
        label: 'Complaints',
        routerLink: ['/complaints'],
        command: (event: any) => {
          this.display = false;
        }
      },
      {
        label: 'Notices',
        routerLink: ['/notices'],
        command: (event: any) => {
          this.display = false;
        }
      },
      {
        label: 'Visitors',
        routerLink: ['/visitors'],
        command: (event: any) => {
          this.display = false;
        }
      },
      {
        label: 'Users',
        routerLink: ['/users'],
        command: (event: any) => {
          this.display = false;
        }
      },
      {
        label: 'Staffs',
        items: [{
          label: '-',
        },
        {
          label: 'Staffs Master',
          routerLink: ['/staffs-master'],
          command: (event: any) => {
            this.display = false;
          }
        },
        {
          label: 'Staffs In/Out',
          routerLink: ['/staffs-in-out'],
          command: (event: any) => {
            this.display = false;
          }
        }
        ]
      },
      {
        label: 'Domestic Helpers',
        items: [{
          label: '-',
        },
        {
          label: 'Domestic Helpers Master',
          routerLink: ['/domestic-helpers-master'],
          command: (event: any) => {
            this.display = false;
          }
        },
        {
          label: 'Domestic Helpers In/Out',
          routerLink: ['/domestic-helpers-in-out'],
          command: (event: any) => {
            this.display = false;
          }
        }
        ]
      },
      {
        label: 'ADs',
        routerLink: ['/ads'],
        command: (event: any) => {
          this.display = false;
        }
      },
      {
        label: 'Communities',
        routerLink: ['/communities'],
        command: (event: any) => {
          this.display = false;
        }
      },
      {
        label: 'Events',
        routerLink: ['/events'],
        command: (event: any) => {
          this.display = false;
        }
      },
      {
        label: 'Notification',
        items: [{
          label: '-',
        },
        {
          label: 'Push',
          routerLink: ['/notification-push'],
          command: (event: any) => {
            this.display = false;
          }
        },
        {
          label: 'Email',
          routerLink: ['/notification-email'],
          command: (event: any) => {
            this.display = false;
          }
        },
        {
          label: 'SMS',
          routerLink: ['/notification-sms'],
          command: (event: any) => {
            this.display = false;
          }
        }
        ]
      },
      {
        label: 'Vehicles',
        items: [{
          label: '-',
        },
        {
          label: 'Vehicles Master',
          routerLink: ['/vehicles-master'],
          command: (event: any) => {
            this.display = false;
          }
        },
        {
          label: 'Vehicles In/Out',
          routerLink: ['/vehicles-in-out'],
          command: (event: any) => {
            this.display = false;
          }
        }
        ]
      },
      {
        label: 'SOS',
        routerLink: ['/sos'],
        command: (event: any) => {
          this.display = false;
        }
      },
      {
        label: 'Reports',
        routerLink: ['/reports'],
        command: (event: any) => {
          this.display = false;
        }
      },
      { separator: true },
      {
        label: 'About',
        routerLink: ['/about'],
        command: (event: any) => {
          this.display = false;
        }
      },
      {
        label: 'Help & Support',
        routerLink: ['/help-support'],
        command: (event: any) => {
          this.display = false;
        }
      },
      {
        label: 'Contact',
        routerLink: ['/contact'],
        command: (event: any) => {
          this.display = false;
        }
      }
    ];

    this.userItem = [{
      label: 'Aditya Mega City',
      items: [
        { label: 'Role: Super Admin' },
        { label: 'Change Password', icon: 'pi rs-logout pi-cog' , routerLink: '/change-password'},
        { label: 'Logout', icon: 'pi rs-logout pi-power-off', routerLink: '/' }
      ]
    }];

    this.notiItem = [{
      label: 'Notification',
      items: [
        { label: 'Lorem ipsum dolor sit amet' },
        { label: 'Nulla tempor ullamcorper' },
        { label: 'Sed odio lorem, ultrices' },
        { label: 'Cras eget sapien dui' },
        { label: 'Integer vel auctor velit' },
        { label: 'Mauris ut molestie justo' }
      ]
    }];
  }

  logout() {

  }
}
