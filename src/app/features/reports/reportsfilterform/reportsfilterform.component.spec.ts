import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsfilterformComponent } from './reportsfilterform.component';

describe('ReportsfilterformComponent', () => {
  let component: ReportsfilterformComponent;
  let fixture: ComponentFixture<ReportsfilterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsfilterformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsfilterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
