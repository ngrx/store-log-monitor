import { Component, Input } from '@angular/core';
import { getChildrenFor } from './types';
import { JsonNodeComponent } from './json-node';


@Component({
  selector: 'ngrx-json-tree',
  template: `
    <ngrx-json-node *ngFor="let child of children" [expanded]="expanded" [value]="child.value" [key]="child.key"></ngrx-json-node>
  `
})
export class JsonTreeComponent {
  children: any[] = [];

  @Input() expanded: boolean = true;
  @Input() set value (value: any) {
    this.children = getChildrenFor(value);
  }
}
