import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonvaluelistgridComponent } from './commonvaluelistgrid.component';

describe('CommonvaluelistgridComponent', () => {
  let component: CommonvaluelistgridComponent;
  let fixture: ComponentFixture<CommonvaluelistgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonvaluelistgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonvaluelistgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
