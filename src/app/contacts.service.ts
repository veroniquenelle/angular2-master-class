import { Injectable, Inject } from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import {Contact} from "./models/contact";
import {Observable} from "rxjs";

@Injectable()
export class ContactsService {

  constructor(private http: Http, @Inject('API_ENDPOINT') private apiEndpoint) { }

  getContacts() {
    return this.http.get(this.apiEndpoint + '/contacts')
      .map(res => res.json())
      .map(data => data.items);
  }

  get(id: string) {
    return this.http.get(this.apiEndpoint + '/contacts/' + id)
      .map(res => res.json().item);
  }

  updateContact(contact: Contact) {
    let url = this.apiEndpoint + '/contacts/' + contact.id;
    return this.http.put(url, contact);
  }

  addContact(contact: Contact) {
    let url = this.apiEndpoint + '/contacts';
    return this.http.post(url, contact);
  }

  private rawSearch(term: string) {
    return this.http.get(this.apiEndpoint + '/search?text=' + term)
      .map(res => res.json())
      .map(data => data.items);
  }

  search(terms: Observable<string>, debounceMs) : Observable<Array<Contact>> {
    return this.getContacts()
      .merge(
        terms
          .debounceTime(debounceMs)
          .distinctUntilChanged()
          .switchMap(term => this.rawSearch(term)));
  }

  isEmailAvailable(email: string) {
    return this.http.get(this.apiEndpoint + '/check-email?email=' + email)
      .map(res => res.json());
  }
}
