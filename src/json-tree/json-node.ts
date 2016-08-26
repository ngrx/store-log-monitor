import { Component, Input, HostBinding } from '@angular/core';
import * as types from './types';


@Component({
  selector: 'ngrx-json-node',
  styles: [`
    :host {
      display: block;
      padding: 2px 2px 2px 20px;
      position: relative;
      color: #70AFCD;
      font-family: 'monaco', 'Consolas', 'Lucida Console', monospace;
    }
    .expanded-indicator {
      position: absolute;
      top: 7px;
      left: 5px;
      font-size: 10px;
      transition: transform 200ms;
    }

    .expanded .expanded-indicator {
      transform: rotate(90deg);
    }

    .node-key::after {
      content: ': ';
      display: inline;
    }

    .expanded .node-label {
      color: #BABBBD !important;
    }

    .node-label {
      color: #9AC05C;
    }

    .node-label.array, .node-label.null, .node-label.iterable {
      color: #D182C0;
    }

    .node-label.number, .node-label.undefined, .node-label.boolean {
      color: #F86936;
    }
  `],
  template: `
    <div (click)="toggle()" [class.expanded]="expanded">
      <span class="expanded-indicator" *ngIf="children">▶</span>
      <span class="node-key">{{ key }}</span>
      <span class="node-label" [ngClass]="type">{{ label }}</span>
    </div>
    <div class="child-nodes" *ngIf="children && expanded">
      <ngrx-json-node *ngFor="let child of children" [value]="child.value" [key]="child.key"></ngrx-json-node>
    </div>
  `
})
export class JsonNodeComponent {
  label: string;
  type: string;
  children: any[];

  @Input() key: string;
  @Input() expanded: boolean = false;
  @Input() set value(value: any) {
    this.label = types.getLabelFor(value);
    this.type = types.getTypeOf(value);

    if (this.type === types.KNOWN.Array || this.type === types.KNOWN.Object || this.type === types.KNOWN.Iterable) {
      this.children = types.getChildrenFor(value);
    }
    else {
      this.children = null;
    }
  }

  toggle() {
    if (this.children) {
      this.expanded = !this.expanded;
    }
  }
}
