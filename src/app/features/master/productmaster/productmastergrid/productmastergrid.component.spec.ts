import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmastergridComponent } from './productmastergrid.component';

describe('ProductmastergridComponent', () => {
  let component: ProductmastergridComponent;
  let fixture: ComponentFixture<ProductmastergridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductmastergridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmastergridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
