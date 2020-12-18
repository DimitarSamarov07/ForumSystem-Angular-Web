import {TestBed} from '@angular/core/testing';

import {GlobalAreaAuthGuard} from './global-area-auth.guard';

describe('UserAreaGuard', () => {
  let guard: GlobalAreaAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GlobalAreaAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
