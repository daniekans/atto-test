import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Farmer, UnpersistedFarmer } from '../models/farmer.interface';

const farmersEndpoint = `${environment.api}/api/farmers`;

@Injectable({ providedIn: 'root' })
export class FarmerService {
  readonly farmerChangeEvent: Subject<void> = new Subject();
  private _currentFarmerList: Farmer[] | undefined;

  constructor(private httpClient: HttpClient) {}

  findAllFarmers(): Observable<Farmer[]> {
    return this.httpClient
      .get<Farmer[]>(farmersEndpoint)
      .pipe(tap((farmerList: Farmer[]) => (this._currentFarmerList = farmerList)));
  }

  createFarmer(farmer: UnpersistedFarmer): Observable<Farmer> {
    return this.httpClient.post<Farmer>(farmersEndpoint, farmer);
  }

  updateFarmer(farmer: Farmer): Observable<Farmer> {
    if (farmer.id <= 0) {
      return throwError(() => new TypeError('The given farmer object must have a valid ID'));
    }

    return this.httpClient.put<Farmer>(`${farmersEndpoint}/${farmer.id}`, farmer);
  }

  deleteFarmer(farmerId: number): Observable<void> {
    if (farmerId <= 0) {
      return throwError(() => new TypeError('The given farmer ID is invalid'));
    }

    return this.httpClient.delete<void>(`${farmersEndpoint}/${farmerId}`);
  }

  hasAnyFarmerWithIdentification(personIdentification: string): boolean {
    return (
      this._currentFarmerList != null &&
      this._currentFarmerList.some(farmer => farmer.personIdentification === personIdentification)
    );
  }
}
