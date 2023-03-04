import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetauditgridComponent } from './assetauditgrid.component';

describe('AssetauditgridComponent', () => {
  let component: AssetauditgridComponent;
  let fixture: ComponentFixture<AssetauditgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetauditgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetauditgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
