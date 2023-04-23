import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationPageComponent } from './accomodation.page.component';

describe('AccomodationPageComponent', () => {
  let component: AccomodationPageComponent;
  let fixture: ComponentFixture<AccomodationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccomodationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccomodationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
