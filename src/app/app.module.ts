import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {ContactsAppComponent} from './contacts.component';
import {ContactsService} from "./contacts.service";
import {ContactsListComponent} from './contacts-list/contacts-list.component';
import {APP_ROUTES} from "./app.routes";
import {ContactsDetailComponent} from './contacts-detail/contacts-detail.component';
import {ContactsEditorComponent} from './contacts-editor/contacts-editor.component';
import {ContactsDetailViewComponent } from './contacts-detail-view/contacts-detail-view.component';
import {TabsComponent} from './tabs/tabs/tabs.component';
import {TabComponent} from './tabs/tab/tab.component';
import {EventbusService} from "./eventbus.service";
import {ContactsCreatorComponent} from './contacts-creator/contacts-creator.component';
import { EmailValidatorDirective } from './email-validator.directive';
import { EmailAvailabilityValidatorDirective } from './email-availability-validator.directive';

@NgModule({
  declarations: [
    ContactsAppComponent,
    ContactsListComponent,
    ContactsDetailComponent,
    ContactsEditorComponent,
    ContactsDetailViewComponent,
    TabsComponent,
    TabComponent,
    ContactsCreatorComponent,
    EmailValidatorDirective,
    EmailAvailabilityValidatorDirective],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES),
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [ContactsAppComponent],
  providers: [
    ContactsService,
    EventbusService,
    {provide:'API_ENDPOINT', useValue:'http://localhost:4201/api'}
    ]
})
export class ContactsModule {

}
