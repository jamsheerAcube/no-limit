import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonvaluelistformComponent } from './commonvaluelistform.component';

describe('CommonvaluelistformComponent', () => {
  let component: CommonvaluelistformComponent;
  let fixture: ComponentFixture<CommonvaluelistformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonvaluelistformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonvaluelistformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
