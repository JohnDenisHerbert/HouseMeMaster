import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyFeedComponent } from './property-feed.component';

describe('PropertyFeedComponent', () => {
  let component: PropertyFeedComponent;
  let fixture: ComponentFixture<PropertyFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 /* it('should create', () => {
    expect(component).toBeTruthy();
  });*/
  
});
