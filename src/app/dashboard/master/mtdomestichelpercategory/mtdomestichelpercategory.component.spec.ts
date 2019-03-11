import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtdomestichelpercategoryComponent } from './mtdomestichelpercategory.component';

describe('MtdomestichelpercategoryComponent', () => {
  let component: MtdomestichelpercategoryComponent;
  let fixture: ComponentFixture<MtdomestichelpercategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdomestichelpercategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtdomestichelpercategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
