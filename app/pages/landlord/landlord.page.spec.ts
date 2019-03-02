import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordPage } from './landlord.page';

describe('LandlordPage', () => {
  let component: LandlordPage;
  let fixture: ComponentFixture<LandlordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
