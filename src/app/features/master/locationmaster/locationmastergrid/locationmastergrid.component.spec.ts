import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationmastergridComponent } from './locationmastergrid.component';

describe('LocationmastergridComponent', () => {
  let component: LocationmastergridComponent;
  let fixture: ComponentFixture<LocationmastergridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationmastergridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationmastergridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
