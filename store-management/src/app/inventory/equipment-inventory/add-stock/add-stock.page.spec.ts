import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddStockPage } from './add-stock.page';

describe('AddStockPage', () => {
  let component: AddStockPage;
  let fixture: ComponentFixture<AddStockPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
