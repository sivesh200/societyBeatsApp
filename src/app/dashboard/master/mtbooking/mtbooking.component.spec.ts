import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtbookingComponent } from './mtbooking.component';

describe('MtbookingComponent', () => {
  let component: MtbookingComponent;
  let fixture: ComponentFixture<MtbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
