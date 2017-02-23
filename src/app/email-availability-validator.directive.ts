import {Directive, forwardRef} from '@angular/core';
import {NG_ASYNC_VALIDATORS, FormControl} from "@angular/forms";
import {ContactsService} from "./contacts.service";
import {Observable} from "rxjs";

export function checkEmailAvailability(contactsService: ContactsService, allowedEmail?: string) {
  return (c: FormControl) => {
    if (allowedEmail && allowedEmail === c.value) {
      return Observable.of(null)
    }

    return contactsService.isEmailAvailable(c.value)
      .map(response => !response.error
        ? null
        : { emailTaken: true });
  };
}

@Directive({
  selector: '[trmCheckEmailAvailability][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => EmailAvailabilityValidatorDirective),
      multi: true
    }
  ]
})
export class EmailAvailabilityValidatorDirective {
  emailAvailabe :Function;

  constructor(contactsService: ContactsService) {
    this.emailAvailabe = checkEmailAvailability(contactsService);
  }

  validate(c: FormControl) {
    return this.emailAvailabe(c);
  }
}
