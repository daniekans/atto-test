import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'src/app/core/tests/translate-testing.module';
import { StateService } from 'src/app/feature/state/services/state.service';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FarmerService } from '../../services/farmer.service';
import { FarmerFormDialogComponent } from './farmer-form-dialog.component';

describe('FarmerFormDialogComponent', () => {
  let component: FarmerFormDialogComponent;
  let fixture: ComponentFixture<FarmerFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerFormDialogComponent],
      providers: [
        {
          provide: FarmerService,
          useValue: jasmine.createSpyObj<FarmerService>(['hasAnyFarmerWithIdentification']),
        },
        {
          provide: StateService,
          useValue: jasmine.createSpyObj<StateService>(['findAllStates']),
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
      imports: [
        TranslateTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(FarmerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
