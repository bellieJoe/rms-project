import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddToCartPage } from './add-to-cart.page';

describe('AddToCartPage', () => {
  let component: AddToCartPage;
  let fixture: ComponentFixture<AddToCartPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddToCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
