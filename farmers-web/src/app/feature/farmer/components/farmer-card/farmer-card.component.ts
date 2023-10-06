import { Component, Input } from '@angular/core';
import { Farmer } from '../../models/farmer.interface';

@Component({
  selector: 'app-farmer-card',
  templateUrl: './farmer-card.component.html',
  styleUrls: ['./farmer-card.component.scss'],
})
export class FarmerCardComponent {
  @Input() farmer!: Farmer;
}
