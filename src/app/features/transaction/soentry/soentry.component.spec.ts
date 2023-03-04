import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoentryComponent } from './soentry.component';

describe('SoentryComponent', () => {
  let component: SoentryComponent;
  let fixture: ComponentFixture<SoentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
