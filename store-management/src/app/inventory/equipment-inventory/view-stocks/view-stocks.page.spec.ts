import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewStocksPage } from './view-stocks.page';

describe('ViewStocksPage', () => {
  let component: ViewStocksPage;
  let fixture: ComponentFixture<ViewStocksPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewStocksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
