import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {eventbusArgs} from "./eventbusArgs";

@Injectable()
export class EventbusService {

  private messages$ = new Subject<eventbusArgs>();

  emit(eventType: string, data: any) {
    this.messages$.next({ type: eventType, data: data });
  }

  observe(eventType: string) {
    return this.messages$
      .filter(args => args.type === eventType)
      .map(args => args.data);
  }
}
