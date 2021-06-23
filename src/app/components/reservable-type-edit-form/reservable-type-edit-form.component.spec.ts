import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservableTypeEditFormComponent } from './reservable-type-edit-form.component';

describe('ReservableTypeEditFormComponent', () => {
  let component: ReservableTypeEditFormComponent;
  let fixture: ComponentFixture<ReservableTypeEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservableTypeEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservableTypeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
