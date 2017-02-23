import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Contact} from "../models/contact";
import {ContactsService} from "../contacts.service";
import {EventbusService} from "../eventbus.service";

@Component({
  selector: 'trm-contacts-detail-view',
  templateUrl: './contacts-detail-view.component.html',
  styleUrls: ['./contacts-detail-view.component.css']
})
export class ContactsDetailViewComponent implements OnInit {

  contact: Contact;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private contactsService: ContactsService,
              private eventBus: EventbusService) {
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.contactsService.get(id).subscribe(contact =>
            {this.contact = contact;
             this.eventBus.emit('appTitleChange', this.contact.name)});
  }

  navigateToList() {
    this.router.navigate(['/']);
  }

  navigateToEditor() {
    // this.router.navigate(['/contact', contact.id, 'edit']);
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }
}
