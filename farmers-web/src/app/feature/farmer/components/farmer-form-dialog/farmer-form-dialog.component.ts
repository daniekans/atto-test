import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Farmer, UnpersistedFarmer } from '../../models/farmer.interface';

@Component({
  selector: 'app-farmer-form-dialog',
  templateUrl: './farmer-form-dialog.component.html',
  styleUrls: ['./farmer-form-dialog.component.scss'],
})
export class FarmerFormDialogComponent implements OnInit {
  formGroup!: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FarmerFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private farmer?: Farmer
  ) {
    this.isEditMode = farmer != null;
  }

  ngOnInit(): void {
    this.buildForm(this.farmer);
  }

  buildForm(farmer?: Farmer): void {
    this.formGroup = this.fb.group({
      companyName: [farmer?.companyName ?? '', [Validators.required]],
      tradingName: [farmer?.tradingName ?? '', [Validators.required]],
      identification: [farmer?.identification ?? '', [Validators.required]],
      city: [farmer?.city ?? '', [Validators.required]],
      state: [farmer?.state ?? '', [Validators.required]],
      phoneNumber: [farmer?.phoneNumber ?? ''],
    });
  }

  onSubmit(): void {
    const formValue = this.formGroup.value;
    const submitedFarmer: UnpersistedFarmer = {
      companyName: formValue.companyName,
      tradingName: formValue.tradingName,
      identification: formValue.identification,
      city: formValue.city,
      state: formValue.state,
      phoneNumber: formValue.phoneNumber,
    };

    if (this.farmer) {
      (submitedFarmer as Farmer).id = this.farmer.id;
    }

    this.dialogRef.close(submitedFarmer);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
