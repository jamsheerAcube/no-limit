import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsummaryComponent } from './assetsummary.component';

describe('AssetsummaryComponent', () => {
  let component: AssetsummaryComponent;
  let fixture: ComponentFixture<AssetsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
