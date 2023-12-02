import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplyInventoryPage } from './supply-inventory.page';

describe('SupplyInventoryPage', () => {
  let component: SupplyInventoryPage;
  let fixture: ComponentFixture<SupplyInventoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SupplyInventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
