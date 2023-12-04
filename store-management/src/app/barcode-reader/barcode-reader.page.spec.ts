import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarcodeReaderPage } from './barcode-reader.page';

describe('BarcodeReaderPage', () => {
  let component: BarcodeReaderPage;
  let fixture: ComponentFixture<BarcodeReaderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BarcodeReaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
