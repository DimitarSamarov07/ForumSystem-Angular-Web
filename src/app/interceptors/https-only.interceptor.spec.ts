import {TestBed} from '@angular/core/testing';

import {HttpsOnlyInterceptor} from './https-only.interceptor';

describe('HttpsOnlyInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpsOnlyInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: HttpsOnlyInterceptor = TestBed.inject(HttpsOnlyInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
