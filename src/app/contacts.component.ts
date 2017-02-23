import {Component, OnInit} from '@angular/core';
import {EventbusService} from "./eventbus.service";

@Component({
  selector: 'trm-contacts-app',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsAppComponent implements OnInit {

  title: string;

  constructor(private eventBus: EventbusService) {

  }

  ngOnInit() {
    this.eventBus.observe('appTitleChange')
      .subscribe(title => this.title = title);
  }
}
