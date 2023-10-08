import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateTestingModule } from 'src/app/core/tests/translate-testing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DeleteFarmerDialogComponent } from './delete-farmer-dialog.component';

describe('DeleteFarmerDialogComponent', () => {
  let component: DeleteFarmerDialogComponent;
  let fixture: ComponentFixture<DeleteFarmerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFarmerDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
      imports: [TranslateTestingModule, MaterialModule],
    });
    fixture = TestBed.createComponent(DeleteFarmerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
