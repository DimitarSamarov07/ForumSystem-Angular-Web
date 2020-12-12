import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexCategoryAdminComponent} from './index-category-admin.component';

describe('IndexCategoryComponent', () => {
  let component: IndexCategoryAdminComponent;
  let fixture: ComponentFixture<IndexCategoryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexCategoryAdminComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCategoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
