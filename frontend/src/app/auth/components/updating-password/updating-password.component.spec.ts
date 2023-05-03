import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatingPasswordComponent } from './updating-password.component';

describe('UpdatingPasswordComponent', () => {
  let component: UpdatingPasswordComponent;
  let fixture: ComponentFixture<UpdatingPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatingPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatingPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
