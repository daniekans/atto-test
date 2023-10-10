import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StateService } from './services/state.service';

@NgModule({
  imports: [CommonModule],
  providers: [StateService],
})
export class StateModule {}
