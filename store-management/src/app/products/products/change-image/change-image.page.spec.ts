import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeImagePage } from './change-image.page';

describe('ChangeImagePage', () => {
  let component: ChangeImagePage;
  let fixture: ComponentFixture<ChangeImagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChangeImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
