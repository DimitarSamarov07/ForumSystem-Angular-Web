import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditCategoryAdminComponent} from './edit-category-admin.component';

describe('EditCategoryAdminComponent', () => {
  let component: EditCategoryAdminComponent;
  let fixture: ComponentFixture<EditCategoryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCategoryAdminComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
