import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderInfoComponent } from './provider-info.component';

describe('ProviderInfoComponent', () => {
  let component: ProviderInfoComponent;
  let fixture: ComponentFixture<ProviderInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderInfoComponent]
    });
    fixture = TestBed.createComponent(ProviderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
