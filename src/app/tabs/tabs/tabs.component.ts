import {Component, OnInit, ContentChildren, QueryList, AfterContentInit} from '@angular/core';
import {TabComponent} from "../tab/tab.component";

@Component({
  selector: 'trm-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  ngAfterContentInit(): void {
    this.select(this.tabs.first);
    // changes is an observable on a querylist
    // this.tabs.changes.subscribe((changes => {this.select(changes.tab)}))
  }

  select(tab: TabComponent) {
    this.tabs.forEach(t => t.selected = false);
    tab.selected = true;
  }
}
