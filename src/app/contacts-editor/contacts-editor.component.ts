import {Component, OnInit} from '@angular/core';
import {Contact} from "../models/contact";
import {ContactsService} from "../contacts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventbusService} from "../eventbus.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {validateEmail} from "../email-validator.directive";
import {checkEmailAvailability} from "../email-availability-validator.directive";

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  contact: Contact = <Contact>{ address: {}};
  form: FormGroup;

  constructor(private contactService: ContactsService,
              private route: ActivatedRoute,
              private router: Router,
              private eventBus: EventbusService,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', validateEmail],
      phone: '',
      birthday: '',
      website: '',
      image: '',
      address: this.builder.group({
        street: '',
        city: '',
        zip: '',
        country: ''
      })
    });

    let id = this.route.snapshot.params['id'];

    this.contactService
      .get(id)
      .subscribe(contact =>
          {this.contact = contact;
           this.form.get('email').setAsyncValidators(checkEmailAvailability(this.contactService, this.contact.email));
           this.eventBus.emit('appTitleChange', 'Editing ' + this.contact.name);
           this.form.patchValue(contact);
        });
  }

  save(contact: Contact) {
    Object.assign(this.contact, contact);
    this.contactService
      .updateContact(contact)
      .subscribe(() => this.router.navigate(['/contact', contact.id]))
  }

  cancel(contact: Contact) {
    this.router.navigate(['/contact', contact.id]);
  }
}
