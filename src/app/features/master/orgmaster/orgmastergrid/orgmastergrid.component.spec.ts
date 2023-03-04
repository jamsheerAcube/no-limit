import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgmastergridComponent } from './orgmastergrid.component';

describe('OrgmastergridComponent', () => {
  let component: OrgmastergridComponent;
  let fixture: ComponentFixture<OrgmastergridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgmastergridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgmastergridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
