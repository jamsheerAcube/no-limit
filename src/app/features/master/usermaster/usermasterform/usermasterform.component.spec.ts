import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermasterformComponent } from './usermasterform.component';

describe('UsermasterformComponent', () => {
  let component: UsermasterformComponent;
  let fixture: ComponentFixture<UsermasterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermasterformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermasterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
