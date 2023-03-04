import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetdepreciationformComponent } from './assetdepreciationform.component';

describe('AssetdepreciationformComponent', () => {
  let component: AssetdepreciationformComponent;
  let fixture: ComponentFixture<AssetdepreciationformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetdepreciationformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetdepreciationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
