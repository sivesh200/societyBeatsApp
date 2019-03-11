import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsMasterComponent } from './staffs-master.component';

describe('StaffsMasterComponent', () => {
  let component: StaffsMasterComponent;
  let fixture: ComponentFixture<StaffsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
