import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoprintComponent } from './demoprint.component';

describe('DemoprintComponent', () => {
  let component: DemoprintComponent;
  let fixture: ComponentFixture<DemoprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoprintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
