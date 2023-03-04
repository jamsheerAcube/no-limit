import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentmastergridComponent } from './departmentmastergrid.component';

describe('DepartmentmastergridComponent', () => {
  let component: DepartmentmastergridComponent;
  let fixture: ComponentFixture<DepartmentmastergridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentmastergridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentmastergridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
