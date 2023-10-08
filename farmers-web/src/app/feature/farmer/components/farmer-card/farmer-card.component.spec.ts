import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerCardComponent } from './farmer-card.component';

describe('FarmerCardComponent', () => {
  let component: FarmerCardComponent;
  let fixture: ComponentFixture<FarmerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerCardComponent],
    });
    fixture = TestBed.createComponent(FarmerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
