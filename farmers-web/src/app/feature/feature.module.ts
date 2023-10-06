import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/components/home/home.component';
import { FarmerModule } from './farmer/farmer.module';

const modules = [FarmerModule];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, ...modules],
  exports: [...modules, HomeComponent],
})
export class FeatureModule {}
