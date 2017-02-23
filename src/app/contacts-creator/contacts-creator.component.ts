import { Component, OnInit } from '@angular/core';
import {Contact} from "../models/contact";
import {ContactsService} from "../contacts.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validateEmail} from "../email-validator.directive";
import {checkEmailAvailability} from "../email-availability-validator.directive";

@Component({
  selector: 'trm-contacts-creator',
  templateUrl: './contacts-creator.component.html',
  styleUrls: ['./contacts-creator.component.css']
})
export class ContactsCreatorComponent implements OnInit {

  form: FormGroup;
  address: FormGroup;

  constructor(private contactsService: ContactsService,
              private router: Router,
              private builder: FormBuilder) { }

  ngOnInit() {
    this.address = this.builder.group({
      street: '',
      city: '',
      zip: '',
      country: ''
    });

    this.form = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', validateEmail, checkEmailAvailability(this.contactsService)],
      phone: '',
      birthday: '',
      website: '',
      image: '',
      address: this.address
    });
  }

  save(contact: Contact) {
    this.contactsService.addContact(contact)
      .subscribe(() => this.router.navigate(['/']));
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
