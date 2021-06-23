import { TestBed } from '@angular/core/testing';

import { ReservableTypeService } from './reservable-type.service';

describe('ReservableTypeService', () => {
  let service: ReservableTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservableTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
