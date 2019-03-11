import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesMasterComponent } from './vehicles-master.component';

describe('VehiclesMasterComponent', () => {
  let component: VehiclesMasterComponent;
  let fixture: ComponentFixture<VehiclesMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclesMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
