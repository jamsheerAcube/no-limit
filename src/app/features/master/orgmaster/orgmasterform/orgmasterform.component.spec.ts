import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgmasterformComponent } from './orgmasterform.component';

describe('OrgmasterformComponent', () => {
  let component: OrgmasterformComponent;
  let fixture: ComponentFixture<OrgmasterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgmasterformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgmasterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
