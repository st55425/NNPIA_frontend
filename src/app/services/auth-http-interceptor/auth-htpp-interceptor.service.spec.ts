import { TestBed } from '@angular/core/testing';

import { AuthHtppInterceptorService } from './auth-htpp-interceptor.service';

describe('AuthHtppInterceptorServiceService', () => {
  let service: AuthHtppInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHtppInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
