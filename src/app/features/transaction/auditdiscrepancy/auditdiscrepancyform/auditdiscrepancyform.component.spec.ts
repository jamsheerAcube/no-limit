import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditdiscrepancyformComponent } from './auditdiscrepancyform.component';

describe('AuditdiscrepancyformComponent', () => {
  let component: AuditdiscrepancyformComponent;
  let fixture: ComponentFixture<AuditdiscrepancyformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditdiscrepancyformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditdiscrepancyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
