import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticHelperMasterComponent } from './domestic-helper-master.component';

describe('DomesticHelperMasterComponent', () => {
  let component: DomesticHelperMasterComponent;
  let fixture: ComponentFixture<DomesticHelperMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomesticHelperMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticHelperMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
