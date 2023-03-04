import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrolemasterformComponent } from './userrolemasterform.component';

describe('UserrolemasterformComponent', () => {
  let component: UserrolemasterformComponent;
  let fixture: ComponentFixture<UserrolemasterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserrolemasterformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrolemasterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
