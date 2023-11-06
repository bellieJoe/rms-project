import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVariantPage } from './add-variant.page';

describe('AddVariantPage', () => {
  let component: AddVariantPage;
  let fixture: ComponentFixture<AddVariantPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddVariantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
