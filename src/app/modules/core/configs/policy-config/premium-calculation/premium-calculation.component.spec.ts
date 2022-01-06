import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCalculationComponent } from './premium-calculation.component';

describe('PremiumCalculationComponent', () => {
  let component: PremiumCalculationComponent;
  let fixture: ComponentFixture<PremiumCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
