/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TagreprintComponent } from './tagreprint.component';

describe('TagreprintComponent', () => {
  let component: TagreprintComponent;
  let fixture: ComponentFixture<TagreprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagreprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagreprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
