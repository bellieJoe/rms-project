import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Test2Page } from './test2.page';

describe('Test2Page', () => {
  let component: Test2Page;
  let fixture: ComponentFixture<Test2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Test2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
