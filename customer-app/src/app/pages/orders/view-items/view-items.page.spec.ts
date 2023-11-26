import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewItemsPage } from './view-items.page';

describe('ViewItemsPage', () => {
  let component: ViewItemsPage;
  let fixture: ComponentFixture<ViewItemsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
