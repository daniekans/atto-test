import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteFarmerDialogComponent } from './components/delete-farmer-dialog/delete-farmer-dialog.component';
import { FarmerCardComponent } from './components/farmer-card/farmer-card.component';
import { FarmerFormDialogComponent } from './components/farmer-form-dialog/farmer-form-dialog.component';
import { FarmerListComponent } from './components/farmer-list/farmer-list.component';

@NgModule({
  declarations: [
    FarmerCardComponent,
    FarmerListComponent,
    FarmerFormDialogComponent,
    DeleteFarmerDialogComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()],
  exports: [FarmerListComponent],
})
export class FarmerModule {}
