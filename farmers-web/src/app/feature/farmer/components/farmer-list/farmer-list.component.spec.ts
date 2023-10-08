import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subject } from 'rxjs';
import { TranslateTestingModule } from 'src/app/core/tests/translate-testing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FarmerService } from '../../services/farmer.service';
import { FarmerListComponent } from './farmer-list.component';

describe('FarmerListComponent', () => {
  let component: FarmerListComponent;
  let fixture: ComponentFixture<FarmerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerListComponent],
      providers: [
        {
          provide: FarmerService,
          useValue: {
            ...jasmine.createSpyObj<FarmerService>(['findAllFarmers']),
            farmerChangeEvent: new Subject<void>(),
          },
        },
      ],
      imports: [TranslateTestingModule, MaterialModule],
    });
    fixture = TestBed.createComponent(FarmerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
