import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FarmerCardComponent } from './components/farmer-card/farmer-card.component';
import { FarmerListComponent } from './components/farmer-list/farmer-list.component';

@NgModule({
  declarations: [FarmerCardComponent, FarmerListComponent],
  imports: [CommonModule, SharedModule, TranslateModule],
  exports: [FarmerListComponent],
})
export class FarmerModule {}
