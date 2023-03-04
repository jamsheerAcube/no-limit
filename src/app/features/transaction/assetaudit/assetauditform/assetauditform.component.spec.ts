import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetauditformComponent } from './assetauditform.component';

describe('AssetauditformComponent', () => {
  let component: AssetauditformComponent;
  let fixture: ComponentFixture<AssetauditformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetauditformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetauditformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
