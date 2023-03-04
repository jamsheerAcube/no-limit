import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentmasterformComponent } from './departmentmasterform.component';

describe('DepartmentmasterformComponent', () => {
  let component: DepartmentmasterformComponent;
  let fixture: ComponentFixture<DepartmentmasterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentmasterformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentmasterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
