import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditverifyformComponent } from './auditverifyform.component';

describe('AuditverifyformComponent', () => {
  let component: AuditverifyformComponent;
  let fixture: ComponentFixture<AuditverifyformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditverifyformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditverifyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
