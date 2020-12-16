import {TestBed} from '@angular/core/testing';

import {UserAreaGuard} from './user-area.guard';

describe('UserAreaGuard', () => {
  let guard: UserAreaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserAreaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
