import {TestBed} from '@angular/core/testing';

import {GlobalAuthenticationCanActivateGuard} from './global-authentication-can-activate.guard';

describe('GlobalAuthenticationCanActivateGuard', () => {
  let guard: GlobalAuthenticationCanActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GlobalAuthenticationCanActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
