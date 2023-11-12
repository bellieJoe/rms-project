import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewVariantPage } from './view-variant.page';

describe('ViewVariantPage', () => {
  let component: ViewVariantPage;
  let fixture: ComponentFixture<ViewVariantPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewVariantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
