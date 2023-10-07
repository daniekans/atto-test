import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerFormDialogComponent } from './farmer-form-dialog.component';

describe('FarmerFormDialogComponent', () => {
  let component: FarmerFormDialogComponent;
  let fixture: ComponentFixture<FarmerFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerFormDialogComponent]
    });
    fixture = TestBed.createComponent(FarmerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
