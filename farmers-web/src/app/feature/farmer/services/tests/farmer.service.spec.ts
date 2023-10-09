import { TestBed, waitForAsync } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { Farmer, UnpersistedFarmer } from '../../models/farmer.interface';
import { FarmerService } from '../../services/farmer.service';
import { getFarmerListStub, getFarmerStub, getUnpersistedFarmerStub } from './mocks/farmer.mock';

describe('FarmerService', () => {
  let farmerService: FarmerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmerService],
      imports: [HttpClientTestingModule],
    });

    farmerService = TestBed.inject(FarmerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('#findAllFarmers', () => {
    it('should fetch and return all farmer records from API', waitForAsync(() => {
      const farmerListStub: Farmer[] = getFarmerListStub();
      const observable: Observable<Farmer[]> = farmerService.findAllFarmers();

      expect(observable).toBeInstanceOf(Observable);

      observable.subscribe({
        next: (returnedFarmerList: Farmer[]) => expect(returnedFarmerList).toBe(farmerListStub),
        error: fail,
      });

      const request: TestRequest = httpMock.expectOne(request => request.method === 'GET');

      request.flush(farmerListStub);
    }));
  });

  describe('#createFarmer', () => {
    it('should create farmer and return the persisted record given valid farmer object', waitForAsync(() => {
      const newFarmerStub: UnpersistedFarmer = getUnpersistedFarmerStub();
      const createdFarmerStub: Farmer = getFarmerStub();
      const observable: Observable<Farmer> = farmerService.createFarmer(newFarmerStub);

      expect(observable).toBeInstanceOf(Observable);

      observable.subscribe({
        next: (createdFarmer: Farmer) => expect(createdFarmer).toBe(createdFarmerStub),
        error: fail,
      });

      const request: TestRequest = httpMock.expectOne(request => request.method === 'POST');

      request.flush(createdFarmerStub);
    }));
  });

  describe('#updateFarmer', () => {
    it('should update farmer and return the updated record given valid farmer object', waitForAsync(() => {
      const farmerToUpdateStub: Farmer = getFarmerStub();
      const updatedFarmerStub: Farmer = getFarmerStub();
      const observable: Observable<Farmer> = farmerService.updateFarmer(farmerToUpdateStub);

      expect(observable).toBeInstanceOf(Observable);

      observable.subscribe({
        next: (updatedFarmer: Farmer) => expect(updatedFarmer).toBe(updatedFarmerStub),
        error: fail,
      });

      const request: TestRequest = httpMock.expectOne(request => request.method === 'PUT');

      request.flush(updatedFarmerStub);
    }));

    it('should return error observable given a farmer object with zero ID', waitForAsync(() => {
      const farmerToUpdateStub: Farmer = getFarmerStub();

      farmerToUpdateStub.id = 0;

      const observable: Observable<Farmer> = farmerService.updateFarmer(farmerToUpdateStub);

      expect(observable).toBeInstanceOf(Observable);

      observable.subscribe({
        next: fail,
        error: error => expect(error).toEqual(jasmine.any(TypeError)),
      });

      httpMock.expectNone(request => request.method === 'PUT');
    }));

    it('should return error observable given a farmer object with negative ID', waitForAsync(() => {
      const farmerToUpdateStub: Farmer = getFarmerStub();

      farmerToUpdateStub.id = -1;

      const observable: Observable<Farmer> = farmerService.updateFarmer(farmerToUpdateStub);

      expect(observable).toBeInstanceOf(Observable);

      observable.subscribe({
        next: fail,
        error: error => expect(error).toEqual(jasmine.any(TypeError)),
      });

      httpMock.expectNone(request => request.method === 'PUT');
    }));
  });

  describe('#deleteFarmer', () => {
    it('should delete farmer given valid farmer object', waitForAsync(() => {
      const farmerIdStub = 1;
      const observable: Observable<void> = farmerService.deleteFarmer(farmerIdStub);

      expect(observable).toBeInstanceOf(Observable);

      observable.subscribe({ error: fail });

      const request: TestRequest = httpMock.expectOne(request => request.method === 'DELETE');

      request.flush(null);
    }));

    it('should return error observable given zero as farmer ID', waitForAsync(() => {
      const observable: Observable<void> = farmerService.deleteFarmer(0);

      expect(observable).toBeInstanceOf(Observable);

      observable.subscribe({
        next: fail,
        error: error => expect(error).toEqual(jasmine.any(TypeError)),
      });

      httpMock.expectNone(request => request.method === 'DELETE');
    }));

    it('should return error observable given negative number as farmer ID', waitForAsync(() => {
      const observable: Observable<void> = farmerService.deleteFarmer(-1);

      expect(observable).toBeInstanceOf(Observable);

      observable.subscribe({
        next: fail,
        error: error => expect(error).toEqual(jasmine.any(TypeError)),
      });

      httpMock.expectNone(request => request.method === 'DELETE');
    }));
  });

  describe('#hasAnyFarmerWithIdentification', () => {
    it('should return true given existing person identification', waitForAsync(() => {
      const farmerListStub: Farmer[] = getFarmerListStub();
      const observable: Observable<Farmer[]> = farmerService.findAllFarmers();

      observable.subscribe((returnedFarmerList: Farmer[]) => {
        const existingFarmer: Farmer = returnedFarmerList[0];
        const existingIdentification: string = existingFarmer.personIdentification;

        expect(farmerService.hasAnyFarmerWithIdentification(existingIdentification)).toBeTrue();
      });

      const request: TestRequest = httpMock.expectOne(request => request.method === 'GET');

      request.flush(farmerListStub);
    }));

    it('should return false given no matching person identification', waitForAsync(() => {
      farmerService.findAllFarmers().subscribe(() => {
        const nonexistentIdentification = 'Nonexistent Identification';

        expect(farmerService.hasAnyFarmerWithIdentification(nonexistentIdentification)).toBeFalse();
      });

      const request: TestRequest = httpMock.expectOne(request => request.method === 'GET');
      const farmerListStub: Farmer[] = getFarmerListStub();

      request.flush(farmerListStub);
    }));

    it('should return false when farmer data is not loaded yet', waitForAsync(() => {
      const personIdentificationStub = 'Identification Stub';

      expect(farmerService.hasAnyFarmerWithIdentification(personIdentificationStub)).toBeFalse();
    }));
  });
});
