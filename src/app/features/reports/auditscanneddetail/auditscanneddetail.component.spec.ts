import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditscanneddetailComponent } from './auditscanneddetail.component';

describe('AuditscanneddetailComponent', () => {
  let component: AuditscanneddetailComponent;
  let fixture: ComponentFixture<AuditscanneddetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditscanneddetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditscanneddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
