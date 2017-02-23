import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Contact} from "../models/contact";
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent {
  @Input() contact: Contact;
  @Output() edit = new EventEmitter<Contact>();
  @Output() back = new EventEmitter<void>();

 }
