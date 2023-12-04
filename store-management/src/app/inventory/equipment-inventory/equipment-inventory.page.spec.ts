import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentInventoryPage } from './equipment-inventory.page';

describe('EquipmentInventoryPage', () => {
  let component: EquipmentInventoryPage;
  let fixture: ComponentFixture<EquipmentInventoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EquipmentInventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
