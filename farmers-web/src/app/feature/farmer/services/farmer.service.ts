import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Farmer } from '../models/farmer.interface';

const farmersEndpoint = `${environment.api}/api/farmers`;

@Injectable({ providedIn: 'root' })
export class FarmerService {
  readonly farmerChangeEvent: Subject<void> = new Subject();

  constructor(private httpClient: HttpClient) {}

  findAllFarmers(): Observable<Farmer[]> {
    return this.httpClient.get<Farmer[]>(farmersEndpoint);
  }

  createFarmer(farmer: Farmer): Observable<Farmer> {
    return this.httpClient.post<Farmer>(farmersEndpoint, farmer);
  }

  updateFarmer(farmer: Farmer): Observable<Farmer> {
    return this.httpClient.put<Farmer>(`${farmersEndpoint}/${farmer.id}`, farmer);
  }

  deleteFarmer(farmerId: number): Observable<void> {
    return this.httpClient.delete<void>(`${farmersEndpoint}/${farmerId}`);
  }
}
