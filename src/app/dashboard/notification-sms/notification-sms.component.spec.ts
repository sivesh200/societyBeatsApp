import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSMSComponent } from './notification-sms.component';

describe('NotificationSMSComponent', () => {
  let component: NotificationSMSComponent;
  let fixture: ComponentFixture<NotificationSMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationSMSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
