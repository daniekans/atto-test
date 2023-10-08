import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { FarmerModule } from './farmer/farmer.module';

const modules = [FarmerModule];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, ...modules],
  exports: [...modules, HomeComponent],
})
export class FeatureModule {}
