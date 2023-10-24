import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAccessPage } from './user-access.page';

describe('UserAccessPage', () => {
  let component: UserAccessPage;
  let fixture: ComponentFixture<UserAccessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserAccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
