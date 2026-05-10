import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganizationModalComponent } from './add-organization-modal.component';

describe('AddOrganizationModalComponent', () => {
  let component: AddOrganizationModalComponent;
  let fixture: ComponentFixture<AddOrganizationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrganizationModalComponent]
    });
    fixture = TestBed.createComponent(AddOrganizationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
