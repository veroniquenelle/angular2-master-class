import { Component, OnInit } from '@angular/core';
import {ContactsService} from "../contacts.service";
import {Contact} from "../models/contact";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs";
import {EventbusService} from "../eventbus.service";
import {Router} from "@angular/router";

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: Observable<Array<Contact>>;
  private terms$ = new Subject<string>();

  constructor(private contactsService: ContactsService,
              private eventBus: EventbusService,
              private router: Router) {
  }

  ngOnInit() {
    this.contacts = this.contactsService.search(this.terms$, 400);
    this.eventBus.emit('appTitleChange', 'Contacts');
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
