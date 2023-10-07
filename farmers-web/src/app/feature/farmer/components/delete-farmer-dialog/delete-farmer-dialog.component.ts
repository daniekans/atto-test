import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Farmer } from '../../models/farmer.interface';

@Component({
  selector: 'app-delete-farmer-dialog',
  templateUrl: './delete-farmer-dialog.component.html',
  styleUrls: ['./delete-farmer-dialog.component.scss'],
})
export class DeleteFarmerDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteFarmerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private farmer: Farmer
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
