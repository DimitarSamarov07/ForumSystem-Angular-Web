import {TestBed} from '@angular/core/testing';

import {GlobalAdminAuthenticationGuard} from './global-admin-authentication.guard';

describe('GlobalAdminAuthenticationGuard', () => {
  let guard: GlobalAdminAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GlobalAdminAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
