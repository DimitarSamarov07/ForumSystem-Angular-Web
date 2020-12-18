import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileImageUploadModalComponent} from './profile-image-upload-modal.component';

describe('ProfileImageUploadModalComponent', () => {
  let component: ProfileImageUploadModalComponent;
  let fixture: ComponentFixture<ProfileImageUploadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileImageUploadModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileImageUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
