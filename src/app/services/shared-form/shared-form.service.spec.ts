import { TestBed } from '@angular/core/testing';

import { SharedFormService } from './shared-form.service';

describe('SharedFormService', () => {
  let service: SharedFormService;
  const emailValidationTests = [
    { value: null, valid: false },
    { value: '', valid: false },
    { value: 'user', valid: false },
    { value: 'user.com', valid: false },
    { value: 'user@mail.com', valid: true },
  ];

  const passwordValidationTests = [
    { value: null, valid: false },
    { value: '', valid: false },
    { value: 'asdf', valid: false },
    { value: 'asdf1', valid: false },
    { value: 'asdF1', valid: false },
    { value: 'asdF1!', valid: false },
    { value: 'asdFgh1!', valid: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  emailValidationTests.forEach((test) => {
    it(`should validate the email address ${test.value}`, () => {
      const emailControl = service.sharedMailFormControl();
      emailControl?.patchValue(test.value);
      expect(emailControl?.valid).toBe(test.valid);
    });
  });

  passwordValidationTests.forEach((test) => {
    it(`should validate the password ${test.value}`, () => {
      const passwordControl = service.sharedPasswordFormControl();
      passwordControl?.patchValue(test.value);
      expect(passwordControl?.valid).toBe(test.valid);
    });
  });

  it('should validate with equal passwords', () => {
    const passwordConfirmationGroup = service.sharedSignUpFormGroup();
    passwordConfirmationGroup.controls['email'].patchValue('user@mail.com');
    passwordConfirmationGroup.controls['password1'].patchValue('asdFgh1!');
    passwordConfirmationGroup.controls['password2'].patchValue('asdFgh1!');
    expect(passwordConfirmationGroup.invalid).toBe(false);
    expect(passwordConfirmationGroup.valid).toBe(true);
  });

  it('should not validate with different passwords', () => {
    const passwordConfirmationGroup = service.sharedSignUpFormGroup();
    passwordConfirmationGroup.controls['email'].patchValue('user@mail.com');
    passwordConfirmationGroup.controls['password1'].patchValue('asdFgh1!');
    passwordConfirmationGroup.controls['password2'].patchValue('asdFgh2!');
    expect(passwordConfirmationGroup.invalid).toBe(true);
    expect(passwordConfirmationGroup.valid).toBe(false);
  });

});
