import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { State } from '../models/state.model';

const statesEndpoint = `${environment.api}/api/states`;

@Injectable({ providedIn: 'root' })
export class StateService {
  private findAllStatesRequest: Observable<State[]> | null = null;
  private statesByIdRequest: Observable<Record<number, State>> | null = null;

  constructor(private httpClient: HttpClient) {}

  findAllStates(): Observable<State[]> {
    if (this.findAllStatesRequest == null) {
      this.findAllStatesRequest = this.httpClient.get<State[]>(statesEndpoint).pipe(shareReplay());
    }

    return this.findAllStatesRequest;
  }

  getAllStatesById(): Observable<Record<number, State>> {
    if (this.statesByIdRequest == null) {
      this.statesByIdRequest = this.findAllStates().pipe(
        map((allStates: State[]) =>
          allStates.reduce(
            (statesHash: Record<number, State>, state: State) => ({
              ...statesHash,
              [state.id]: state,
            }),
            {}
          )
        ),
        shareReplay()
      );
    }

    return this.statesByIdRequest;
  }
}
