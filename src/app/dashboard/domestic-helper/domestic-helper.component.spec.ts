import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticHelperComponent } from './domestic-helper.component';

describe('DomesticHelperComponent', () => {
  let component: DomesticHelperComponent;
  let fixture: ComponentFixture<DomesticHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomesticHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
