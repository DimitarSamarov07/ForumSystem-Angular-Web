import {TestBed} from '@angular/core/testing';

import {CategoryAdminService} from './category-admin.service';

describe('CategoryService', () => {
  let service: CategoryAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
