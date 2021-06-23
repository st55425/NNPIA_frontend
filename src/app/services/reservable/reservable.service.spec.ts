import { TestBed } from '@angular/core/testing';

import { ReservableService } from './reservable.service';

describe('ReservableService', () => {
  let service: ReservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
