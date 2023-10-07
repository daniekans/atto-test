import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, tap } from 'rxjs';
import { Farmer } from '../../models/farmer.interface';
import { FarmerService } from '../../services/farmer.service';
import { DeleteFarmerDialogComponent } from '../delete-farmer-dialog/delete-farmer-dialog.component';

@Component({
  selector: 'app-farmer-card',
  templateUrl: './farmer-card.component.html',
  styleUrls: ['./farmer-card.component.scss'],
})
export class FarmerCardComponent {
  @Input() farmer!: Farmer;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private farmerService: FarmerService,
    private translateService: TranslateService
  ) {}

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteFarmerDialogComponent, { data: this.farmer });

    dialogRef.afterClosed().subscribe((confirmedExclusion: boolean | undefined) => {
      if (confirmedExclusion) {
        this.farmerService
          .deleteFarmer(this.farmer.id)
          .pipe(
            tap(() => this.farmerService.farmerChangeEvent.next()),
            switchMap(() => this.translateService.get('DELETE_FARMER_DIALOG.DELETED_SUCCESSFULLY'))
          )
          .subscribe((message: string) => this.snackBar.open(message));
      }
    });
  }
}
