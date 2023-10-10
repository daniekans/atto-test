import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable, filter, switchMap, tap } from 'rxjs';
import { State } from 'src/app/feature/state/models/state.model';
import { StateService } from 'src/app/feature/state/services/state.service';
import { Farmer } from '../../models/farmer.interface';
import { FarmerService } from '../../services/farmer.service';
import { DeleteFarmerDialogComponent } from '../delete-farmer-dialog/delete-farmer-dialog.component';
import { FarmerFormDialogComponent } from '../farmer-form-dialog/farmer-form-dialog.component';

@Component({
  selector: 'app-farmer-card',
  templateUrl: './farmer-card.component.html',
  styleUrls: ['./farmer-card.component.scss'],
})
export class FarmerCardComponent implements OnInit {
  @Input() farmer!: Farmer;
  statesById$: Observable<Record<number, State>> | undefined;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private farmerService: FarmerService,
    private translateService: TranslateService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.statesById$ = this.stateService.getAllStatesById();
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteFarmerDialogComponent, { data: this.farmer });

    dialogRef
      .afterClosed()
      .pipe(
        filter((confirmedExclusion: boolean) => confirmedExclusion != null && confirmedExclusion),
        switchMap(() => this.farmerService.deleteFarmer(this.farmer.id)),
        tap(() => this.farmerService.farmerChangeEvent.next()),
        switchMap(() => this.translateService.get('DELETE_FARMER_DIALOG.DELETED_SUCCESSFULLY'))
      )
      .subscribe((message: string) => this.snackBar.open(message));
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(FarmerFormDialogComponent, { data: this.farmer });

    dialogRef
      .afterClosed()
      .pipe(
        filter((editedFarmer: Farmer) => editedFarmer != null),
        switchMap((editedFarmer: Farmer) => this.farmerService.updateFarmer(editedFarmer)),
        tap(() => this.farmerService.farmerChangeEvent.next()),
        switchMap(() => this.translateService.get('FARMER_FORM_DIALOG.EDITED_SUCCESSFULLY'))
      )
      .subscribe((message: string) => this.snackBar.open(message));
  }
}
