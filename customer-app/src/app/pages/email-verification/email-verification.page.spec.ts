import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailVerificationPage } from './email-verification.page';

describe('EmailVerificationPage', () => {
  let component: EmailVerificationPage;
  let fixture: ComponentFixture<EmailVerificationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmailVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
