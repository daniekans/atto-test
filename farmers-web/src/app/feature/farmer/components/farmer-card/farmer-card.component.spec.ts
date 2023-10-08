import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Subject } from 'rxjs';
import { TranslateTestingModule } from 'src/app/core/tests/translate-testing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FarmerService } from '../../services/farmer.service';
import { FarmerCardComponent } from './farmer-card.component';

describe('FarmerCardComponent', () => {
  let component: FarmerCardComponent;
  let fixture: ComponentFixture<FarmerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerCardComponent],
      providers: [
        {
          provide: FarmerService,
          useValue: {
            ...jasmine.createSpyObj<FarmerService>(['deleteFarmer', 'updateFarmer']),
            farmerChangeEvent: new Subject<void>(),
          },
        },
        provideNgxMask(),
      ],
      imports: [TranslateTestingModule, MaterialModule, NgxMaskPipe],
    });
    fixture = TestBed.createComponent(FarmerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
