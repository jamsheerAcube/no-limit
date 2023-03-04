import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeemasterformComponent } from './employeemasterform.component';

describe('EmployeemasterformComponent', () => {
  let component: EmployeemasterformComponent;
  let fixture: ComponentFixture<EmployeemasterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeemasterformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeemasterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
