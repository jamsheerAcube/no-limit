import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetverificationgridComponent } from './assetverificationgrid.component';

describe('AssetverificationgridComponent', () => {
  let component: AssetverificationgridComponent;
  let fixture: ComponentFixture<AssetverificationgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetverificationgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetverificationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
