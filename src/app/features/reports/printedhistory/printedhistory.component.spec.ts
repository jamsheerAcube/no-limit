import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintedhistoryComponent } from './printedhistory.component';

describe('PrintedhistoryComponent', () => {
  let component: PrintedhistoryComponent;
  let fixture: ComponentFixture<PrintedhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintedhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintedhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
