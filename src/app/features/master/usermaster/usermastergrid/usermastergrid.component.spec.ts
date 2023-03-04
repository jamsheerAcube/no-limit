import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermastergridComponent } from './usermastergrid.component';

describe('UsermastergridComponent', () => {
  let component: UsermastergridComponent;
  let fixture: ComponentFixture<UsermastergridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermastergridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermastergridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
