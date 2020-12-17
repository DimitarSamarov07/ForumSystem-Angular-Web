import {TestBed} from '@angular/core/testing';

import {GlobalAuthenticationGuard} from './global-authentication.guard';

describe('GlobalAuthenticationGuard', () => {
  let guard: GlobalAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GlobalAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
