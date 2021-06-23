import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservableEditFormComponent } from './reservable-edit-form.component';

describe('ReservableEditFormComponent', () => {
  let component: ReservableEditFormComponent;
  let fixture: ComponentFixture<ReservableEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservableEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservableEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
