import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceiptPage } from './receipt.page';

describe('ReceiptPage', () => {
  let component: ReceiptPage;
  let fixture: ComponentFixture<ReceiptPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
