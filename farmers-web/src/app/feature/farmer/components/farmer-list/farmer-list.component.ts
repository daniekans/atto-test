import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Farmer } from '../../models/farmer.interface';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-farmer-list',
  templateUrl: './farmer-list.component.html',
  styleUrls: ['./farmer-list.component.scss'],
})
export class FarmerListComponent implements OnInit {
  farmerList$: Observable<Farmer[]> | undefined;

  constructor(private farmerService: FarmerService) {}

  ngOnInit(): void {
    this.farmerList$ = this.farmerService.findAllFarmers();
  }
}
