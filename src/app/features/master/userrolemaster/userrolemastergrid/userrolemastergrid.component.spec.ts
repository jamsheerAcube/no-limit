import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrolemastergridComponent } from './userrolemastergrid.component';

describe('UserrolemastergridComponent', () => {
  let component: UserrolemastergridComponent;
  let fixture: ComponentFixture<UserrolemastergridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserrolemastergridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrolemastergridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
