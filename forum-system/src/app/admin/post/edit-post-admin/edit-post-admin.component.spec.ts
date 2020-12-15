import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditPostAdminComponent} from './edit-post-admin.component';

describe('EditPostAdminComponent', () => {
  let component: EditPostAdminComponent;
  let fixture: ComponentFixture<EditPostAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPostAdminComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
