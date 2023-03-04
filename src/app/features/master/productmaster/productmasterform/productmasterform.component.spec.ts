import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmasterformComponent } from './productmasterform.component';

describe('ProductmasterformComponent', () => {
  let component: ProductmasterformComponent;
  let fixture: ComponentFixture<ProductmasterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductmasterformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmasterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
