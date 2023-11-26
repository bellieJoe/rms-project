import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelPage } from './cancel.page';

describe('CancelPage', () => {
  let component: CancelPage;
  let fixture: ComponentFixture<CancelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CancelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
