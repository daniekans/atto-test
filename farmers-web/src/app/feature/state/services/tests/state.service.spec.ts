import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { State } from '../../models/state.model';
import { StateService } from '../state.service';
import { getStateListStub } from './mocks/state.mock';

describe('StateService', () => {
  let stateService: StateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateService],
      imports: [HttpClientTestingModule],
    });

    stateService = TestBed.inject(StateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('#findAllStates', () => {
    it('should fetch and return all state records from API', waitForAsync(() => {
      const stateListStub: State[] = getStateListStub();
      const observable: Observable<State[]> = stateService.findAllStates();

      expect(observable).toBeInstanceOf(Observable);

      observable.subscribe({
        next: (returnedStateList: State[]) => expect(returnedStateList).toBe(stateListStub),
        error: fail,
      });

      const request: TestRequest = httpMock.expectOne(request => request.method === 'GET');

      request.flush(stateListStub);
    }));

    it('should not make any additional HTTP request when state data is loaded already', waitForAsync(() => {
      const stateListStub: State[] = getStateListStub();
      const initialObservable: Observable<State[]> = stateService.findAllStates();
      const secondObservable: Observable<State[]> = stateService.findAllStates();

      expect(initialObservable).toBe(secondObservable);

      initialObservable.subscribe({
        next: (returnedStateList: State[]) => expect(returnedStateList).toBe(stateListStub),
        error: fail,
      });

      const request: TestRequest = httpMock.expectOne(request => request.method === 'GET');

      request.flush(stateListStub);
    }));
  });

  describe('#getAllStatesById', () => {
    it('should return states hash object where ID is the key and state is the value', waitForAsync(() => {
      const stateListStub: State[] = getStateListStub();
      const observable: Observable<Record<number, State>> = stateService.getAllStatesById();

      expect(observable).toBeInstanceOf(Observable);

      observable.subscribe({
        next: (returnedStateHash: Record<number, State>) => {
          expect(Object.keys(returnedStateHash).length).toBe(stateListStub.length);
          expect(stateListStub.every(state => returnedStateHash[state.id] === state)).toBeTrue();
        },
        error: fail,
      });

      const request: TestRequest = httpMock.expectOne(request => request.method === 'GET');

      request.flush(stateListStub);
    }));

    it('should not make any additional HTTP request when state hash object is loaded already', waitForAsync(() => {
      const stateListStub: State[] = getStateListStub();
      const initialObservable: Observable<Record<number, State>> = stateService.getAllStatesById();
      const secondObservable: Observable<Record<number, State>> = stateService.getAllStatesById();

      expect(initialObservable).toBe(secondObservable);

      initialObservable.subscribe({
        next: (returnedStateHash: Record<number, State>) => {
          expect(Object.keys(returnedStateHash).length).toBe(stateListStub.length);
          expect(stateListStub.every(state => returnedStateHash[state.id] === state)).toBeTrue();
        },
        error: fail,
      });

      const request: TestRequest = httpMock.expectOne(request => request.method === 'GET');

      request.flush(stateListStub);
    }));
  });
});
