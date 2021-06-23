import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservationsTableComponent } from './user-reservations-table.component';

describe('UserReservationsTableComponent', () => {
  let component: UserReservationsTableComponent;
  let fixture: ComponentFixture<UserReservationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReservationsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReservationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
