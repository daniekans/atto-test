import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment.dev';
import { Farmer } from '../models/farmer.interface';

const farmersEndpoint = `${environment.api}/api/farmers`;

@Injectable({ providedIn: 'root' })
export class FarmerService {
  constructor(private httpClient: HttpClient) {}

  findAllFarmers(): Observable<Farmer[]> {
    return this.httpClient.get<Farmer[]>(farmersEndpoint);
  }

  createFarmer(farmer: Farmer): Observable<void> {
    return this.httpClient.post<void>(farmersEndpoint, farmer);
  }

  updateFarmer(farmer: Farmer): Observable<void> {
    return this.httpClient.put<void>(`${farmersEndpoint}/${farmer.id}`, farmer);
  }

  deleteFarmer(farmerId: number): Observable<void> {
    return this.httpClient.delete<void>(`${farmersEndpoint}/${farmerId}`);
  }
}
