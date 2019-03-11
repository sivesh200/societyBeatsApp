import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtsoscategoryComponent } from './mtsoscategory.component';

describe('MtsoscategoryComponent', () => {
  let component: MtsoscategoryComponent;
  let fixture: ComponentFixture<MtsoscategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtsoscategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtsoscategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
