import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeemastergridComponent } from './employeemastergrid.component';

describe('EmployeemastergridComponent', () => {
  let component: EmployeemastergridComponent;
  let fixture: ComponentFixture<EmployeemastergridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeemastergridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeemastergridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
