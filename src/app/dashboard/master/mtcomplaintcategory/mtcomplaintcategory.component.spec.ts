import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtcomplaintcategoryComponent } from './mtcomplaintcategory.component';

describe('MtcomplaintcategoryComponent', () => {
  let component: MtcomplaintcategoryComponent;
  let fixture: ComponentFixture<MtcomplaintcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtcomplaintcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtcomplaintcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
