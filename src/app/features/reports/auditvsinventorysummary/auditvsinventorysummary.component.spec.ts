import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditvsinventorysummaryComponent } from './auditvsinventorysummary.component';

describe('AuditvsinventorysummaryComponent', () => {
  let component: AuditvsinventorysummaryComponent;
  let fixture: ComponentFixture<AuditvsinventorysummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditvsinventorysummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditvsinventorysummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
