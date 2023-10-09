import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable, filter, switchMap, tap } from 'rxjs';
import { Farmer, UnpersistedFarmer } from '../../models/farmer.interface';
import { FarmerService } from '../../services/farmer.service';
import { FarmerFormDialogComponent } from '../farmer-form-dialog/farmer-form-dialog.component';

@Component({
  selector: 'app-farmer-list',
  templateUrl: './farmer-list.component.html',
  styleUrls: ['./farmer-list.component.scss'],
})
export class FarmerListComponent implements OnInit {
  farmerList$: Observable<Farmer[]> | undefined;

  constructor(
    private farmerService: FarmerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.fetchFarmerData();
    this.farmerService.farmerChangeEvent.subscribe(() => this.fetchFarmerData());
  }

  fetchFarmerData(): void {
    this.farmerList$ = this.farmerService.findAllFarmers();
  }

  onAddButtonClicked(): void {
    const dialogRef = this.dialog.open(FarmerFormDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(
        filter((newFarmer: UnpersistedFarmer) => newFarmer != null),
        switchMap((newFarmer: UnpersistedFarmer) => this.farmerService.createFarmer(newFarmer)),
        tap(() => this.farmerService.farmerChangeEvent.next()),
        switchMap(() => this.translateService.get('FARMER_FORM_DIALOG.ADDED_SUCCESSFULLY'))
      )
      .subscribe((message: string) => this.snackBar.open(message));
  }
}
