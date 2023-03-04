import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditverifygridComponent } from './auditverifygrid.component';

describe('AuditverifygridComponent', () => {
  let component: AuditverifygridComponent;
  let fixture: ComponentFixture<AuditverifygridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditverifygridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditverifygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
