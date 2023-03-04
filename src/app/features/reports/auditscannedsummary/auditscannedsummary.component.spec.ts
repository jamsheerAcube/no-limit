import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditscannedsummaryComponent } from './auditscannedsummary.component';

describe('AuditscannedsummaryComponent', () => {
  let component: AuditscannedsummaryComponent;
  let fixture: ComponentFixture<AuditscannedsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditscannedsummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditscannedsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
