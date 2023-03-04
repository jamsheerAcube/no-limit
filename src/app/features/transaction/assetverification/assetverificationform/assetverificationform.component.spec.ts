import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetverificationformComponent } from './assetverificationform.component';

describe('AssetverificationformComponent', () => {
  let component: AssetverificationformComponent;
  let fixture: ComponentFixture<AssetverificationformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetverificationformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetverificationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
