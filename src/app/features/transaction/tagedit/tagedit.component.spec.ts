import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TageditComponent } from './tagedit.component';

describe('TageditComponent', () => {
  let component: TageditComponent;
  let fixture: ComponentFixture<TageditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TageditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TageditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
