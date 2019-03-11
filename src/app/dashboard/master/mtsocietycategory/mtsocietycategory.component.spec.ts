import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtsocietycategoryComponent } from './mtsocietycategory.component';

describe('MtsocietycategoryComponent', () => {
  let component: MtsocietycategoryComponent;
  let fixture: ComponentFixture<MtsocietycategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtsocietycategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtsocietycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
