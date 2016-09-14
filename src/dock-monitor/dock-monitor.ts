import { Component, ChangeDetectionStrategy, Input, OnDestroy, EventEmitter } from '@angular/core';
import { select } from '@ngrx/core/operator/select';
import { StoreDevtools } from '@ngrx/store-devtools';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operator/map';
import { DockState, PositionsType } from './reducer';
import { DockActions } from './actions';


@Component({
  selector: 'dock-monitor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ngrx-commander [shortcut]="toggleCommand" (command)="toggle$.emit($event)"></ngrx-commander>
    <ngrx-commander [shortcut]="positionCommand" (command)="changePosition$.emit($event)"></ngrx-commander>

    <ngrx-dock [visible]="visible$ | async" [position]="position$ | async" [size]="size$ | async">
      <ng-content></ng-content>
    </ngrx-dock>
  `
})
export class DockMonitorComponent implements OnDestroy {
  @Input() toggleCommand: string;
  @Input() positionCommand: string;

  state$: Observable<DockState>;
  visible$: Observable<boolean>;
  position$: Observable<PositionsType>;
  size$: Observable<number>;
  toggle$: EventEmitter<any>;
  changePosition$: EventEmitter<any>;
  actionsSubscription: Subscription;

  constructor(tools: StoreDevtools, actions: DockActions) {
    this.state$ = select.call(tools.liftedState, s => s.monitorState);
    this.visible$ = select.call(this.state$, (s: DockState) => s.visible);
    this.position$ = select.call(this.state$, (s: DockState) => s.position);
    this.size$ = select.call(this.state$, (s: DockState) => s.size);

    this.toggle$ = new EventEmitter();
    this.changePosition$ = new EventEmitter();

    this.actionsSubscription = merge(
      map.call(this.toggle$, () => actions.toggleVisibility()),
      map.call(this.changePosition$, () => actions.changePosition())
    ).subscribe(tools);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
