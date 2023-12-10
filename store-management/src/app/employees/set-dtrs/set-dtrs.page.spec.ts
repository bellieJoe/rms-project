import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetDtrsPage } from './set-dtrs.page';

describe('SetDtrsPage', () => {
  let component: SetDtrsPage;
  let fixture: ComponentFixture<SetDtrsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SetDtrsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
