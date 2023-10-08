import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subject } from 'rxjs';
import { TranslateTestingModule } from 'src/app/core/tests/translate-testing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FarmerModule } from '../../farmer/farmer.module';
import { FarmerService } from '../../farmer/services/farmer.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: FarmerService,
          useValue: {
            ...jasmine.createSpyObj<FarmerService>(['findAllFarmers']),
            farmerChangeEvent: new Subject<void>(),
          },
        },
      ],
      imports: [MaterialModule, TranslateTestingModule, FarmerModule],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
