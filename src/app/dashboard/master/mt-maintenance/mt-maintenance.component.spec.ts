import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtMaintenanceComponent } from './mt-maintenance.component';

describe('MtMaintenanceComponent', () => {
  let component: MtMaintenanceComponent;
  let fixture: ComponentFixture<MtMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
