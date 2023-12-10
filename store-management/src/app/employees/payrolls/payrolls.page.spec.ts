import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayrollsPage } from './payrolls.page';

describe('PayrollsPage', () => {
  let component: PayrollsPage;
  let fixture: ComponentFixture<PayrollsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PayrollsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
