import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFarmerDialogComponent } from './delete-farmer-dialog.component';

describe('DeleteFarmerDialogComponent', () => {
  let component: DeleteFarmerDialogComponent;
  let fixture: ComponentFixture<DeleteFarmerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFarmerDialogComponent],
    });
    fixture = TestBed.createComponent(DeleteFarmerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
