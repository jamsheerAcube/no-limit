import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationmasterformComponent } from './locationmasterform.component';

describe('LocationmasterformComponent', () => {
  let component: LocationmasterformComponent;
  let fixture: ComponentFixture<LocationmasterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationmasterformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationmasterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
