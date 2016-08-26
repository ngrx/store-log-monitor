import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LogEntryItem } from './log-entry-item';


@Component({
  selector: 'log-monitor-entry',
  template: `
    <div class="title-bar" [ngClass]="{ collapsed: item.collapsed }" (click)="handleToggle()">
      {{ item.action.type }}
    </div>
    <div class="action-bar" *ngIf="!item.collapsed">
      <ngrx-json-tree [value]="stateActionPair" [expanded]="expandEntries"></ngrx-json-tree>
    </div>
  `,
  styles: [`
    :host{
      color: #FFFFFF;
      background-color: #4F5A65;
      cursor: pointer;
    }
    .title-bar{
      padding: 8px 0 7px 16px;
      background-color: rgba(0,0,0,0.1);
    }
    .action-bar{
      padding: 20px;
    }
    .collapsed{
      text-decoration: line-through;
      font-style: italic;
      opacity: 0.5;
    }
  `]
})
export class LogMonitorEntryComponent {
  private _item: LogEntryItem;
  public stateActionPair;

  @Input() expandEntries: boolean = false;
  @Input() disabled: boolean = false;
  @Input() set item(value: LogEntryItem) {
    this._item = value;
    this.stateActionPair = {
      state: value.state,
      action: value.action
    };
  }

  get item() {
    return this._item;
  }

  @Output() toggle = new EventEmitter();

  handleToggle() {
    if (!this.disabled) {
      this.toggle.next({ id: this.item.actionId });
    }
  }

  logPayload() {
    console.log(this.item.action);
  }

  logState() {
    console.log(this.item.state);
  }
}
