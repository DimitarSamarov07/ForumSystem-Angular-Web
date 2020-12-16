import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListCategoryPostsAdminComponent} from './list-category-posts-admin.component';

describe('ListCategoryPostsAdminComponent', () => {
  let component: ListCategoryPostsAdminComponent;
  let fixture: ComponentFixture<ListCategoryPostsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCategoryPostsAdminComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoryPostsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
